use mongodb::{Client, Database, options::ClientOptions, error::Error};

pub async fn init_db() -> Result<Database, Error> {
    let client_uri = "mongodb://mongodb:27017/ecoblockchain";
    println!("Connecting to MongoDB with URI: {}", client_uri);

    let mut client_options = ClientOptions::parse(client_uri).await?;
    client_options.app_name = Some("BlockchainApp".to_string());
    let client = Client::with_options(client_options)?;

    // Vérifier la connexion en listant les collections
    match client.database("ecoblockchain").list_collection_names(None).await {
        Ok(collections) => {
            println!("Connected to MongoDB. Collections: {:?}", collections);
            Ok(client.database("ecoblockchain"))
        }
        Err(e) => {
            println!("Failed to connect to MongoDB: {}", e);
            Err(e)
        }
    }
}
