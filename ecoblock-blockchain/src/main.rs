mod block;
mod blockchain;
mod transaction;
mod wallet;
mod consensus;

use blockchain::Blockchain;
use wallet::Wallet;
use warp::Filter;
use serde::{Serialize, Deserialize};
use std::sync::{Arc, Mutex};

// Structure pour recevoir des nouvelles données de bloc via une requête HTTP
#[derive(Serialize, Deserialize, Debug)]
struct NewBlockRequest {
    data: String,
}

#[tokio::main]
async fn main() {
    // Utilisation d'Arc et Mutex pour permettre un accès partagé et sécurisé aux structures
    let blockchain = Arc::new(Mutex::new(Blockchain::new()));
    let wallet = Arc::new(Mutex::new(Wallet::new()));

    // Endpoint pour récupérer la chaîne de blocs
    let get_chain = {
        let blockchain = Arc::clone(&blockchain);
        warp::path!("chain")
            .and(warp::get())
            .map(move || {
                let blockchain = blockchain.lock().unwrap();
                warp::reply::json(&blockchain.chain)
            })
    };

    // Endpoint pour ajouter un nouveau bloc à la chaîne
    let add_block = {
        let blockchain = Arc::clone(&blockchain);
        warp::path!("add_block")
            .and(warp::post())
            .and(warp::body::json())
            .map(move |new_block: NewBlockRequest| {
                let mut blockchain = blockchain.lock().unwrap();
                blockchain.add_block(new_block.data);
                warp::reply::json(&blockchain.chain)
            })
    };

    // Endpoint pour vérifier le solde d'un portefeuille
    let get_wallet = {
        let wallet = Arc::clone(&wallet);
        warp::path!("wallet" / String)
            .and(warp::get())
            .map(move |address: String| {
                let wallet = wallet.lock().unwrap();
                let balance = wallet.balances.get(&address).cloned().unwrap_or(0);
                warp::reply::json(&balance)
            })
    };

    let routes = get_chain.or(add_block).or(get_wallet);

    warp::serve(routes).run(([0, 0, 0, 0], 9000)).await;
}
