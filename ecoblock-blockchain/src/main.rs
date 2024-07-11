use serde::{Serialize, Deserialize};
use std::sync::Arc;
use warp::Filter;
use tokio::sync::Mutex;
use log::info;

mod db;
mod block;
mod tangle;
mod wallet;

use wallet::Wallet;
use tangle::Tangle;
use block::{Data, Environment, Location};

#[derive(Serialize, Deserialize, Debug)]
struct NewBlockRequest {
    data: Data,
    proposer_id: String,
}

#[derive(Serialize)]
struct WalletResponse {
    passphrase: String,
    address: String,
}

#[derive(Debug)]
struct CustomError(String);

impl warp::reject::Reject for CustomError {}

#[tokio::main]
async fn main() {
    let db = db::init_db().await.expect("Failed to initialize database");
    let wallet = Arc::new(Mutex::new(Wallet::new(db.clone())));
    let tangle = Arc::new(Mutex::new(Tangle::new(db, Arc::clone(&wallet)).await));

    // Charger les portefeuilles depuis la base de données
    {
        let mut wallet = wallet.lock().await;
        wallet.load_wallets().await;
    }

    env_logger::init();

    let get_chain = {
        let tangle = Arc::clone(&tangle);
        warp::path!("chain")
            .and(warp::get())
            .and_then(move || {
                let tangle = Arc::clone(&tangle);
                async move {
                    let tangle = tangle.lock().await;
                    Ok::<_, warp::Rejection>(warp::reply::json(&tangle.blocks))
                }
            })
    };

    let add_block = {
        let tangle = Arc::clone(&tangle);
        warp::path!("add_block")
            .and(warp::post())
            .and(warp::body::json())
            .and_then(move |new_block: NewBlockRequest| {
                let tangle = Arc::clone(&tangle);
                async move {
                    info!("Received new block request: {:?}", new_block);
                    let mut tangle = tangle.lock().await;
                    match tangle.add_block(new_block.data, new_block.proposer_id).await {
                        Ok(_) => Ok::<_, warp::Rejection>(warp::reply::json(&tangle.blocks)),
                        Err(err) => Err(warp::reject::custom(CustomError(err))),
                    }
                }
            })
    };

    let get_wallet = {
        let wallet = Arc::clone(&wallet);
        warp::path!("wallet" / String)
            .and(warp::get())
            .and_then(move |address: String| {
                let wallet = Arc::clone(&wallet);
                async move {
                    let wallet = wallet.lock().await;
                    let balance = wallet.balances.get(&address).cloned().unwrap_or(0);
                    Ok::<_, warp::Rejection>(warp::reply::json(&balance))
                }
            })
    };

    let create_wallet = {
        let wallet = Arc::clone(&wallet);
        warp::path!("create_wallet")
            .and(warp::post())
            .and_then(move || {
                let wallet = Arc::clone(&wallet);
                async move {
                    let mut wallet = wallet.lock().await;
                    let (passphrase, address) = wallet.create_wallet_with_passphrase().await;
                    Ok::<_, warp::Rejection>(warp::reply::json(&WalletResponse { passphrase, address }))
                }
            })
    };

    let routes = get_chain.or(add_block).or(get_wallet).or(create_wallet);

    info!("Starting the server at http://localhost:9000");
    warp::serve(routes).run(([0, 0, 0, 0], 9000)).await;
}
