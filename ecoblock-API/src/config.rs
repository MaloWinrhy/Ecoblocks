use std::env;

pub struct Config {
    pub database_url: String,
    pub server_address: String,
}

impl Config {
    pub fn from_env() -> Result<Self, &'static str> {
        let database_url = env::var("DATABASE_URL").map_err(|_| "DATABASE_URL must be set")?;
        let server_address = env::var("SERVER_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8000".to_string());

        Ok(Config {
            database_url,
            server_address,
        })
    }
}
