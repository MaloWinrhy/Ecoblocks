use std::env;
use dotenvy::dotenv;

#[derive(Clone)]
pub struct Config {
    pub database_url: String,
    pub server_address: String,
    pub api_key: String,
}

impl Config {
    pub fn from_env() -> Result<Self, &'static str> {
        dotenv().ok(); // Charger les variables d'environnement

        let database_url = env::var("DATABASE_URL").map_err(|_| "DATABASE_URL must be set")?;
        let server_address = env::var("SERVER_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8000".to_string());
        let api_key = env::var("API_KEY").map_err(|_| "API_KEY must be set")?;

        Ok(Config {
            database_url,
            server_address,
            api_key,
        })
    }
}
