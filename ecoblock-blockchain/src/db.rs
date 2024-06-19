use mongodb::{Client, Database, options::ClientOptions};
use std::env;

pub async fn init_db() -> Database {
    let client_uri = env::var("MONGODB_URI").expect("You must set the MONGODB_URI environment var!");
    let mut client_options = ClientOptions::parse(&client_uri).await.unwrap();
    client_options.app_name = Some("BlockchainApp".to_string());
    let client = Client::with_options(client_options).unwrap();
    client.database("blockchain")
}
