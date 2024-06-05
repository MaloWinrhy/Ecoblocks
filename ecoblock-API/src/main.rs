mod features;
mod config;
mod utils;
mod startup;

use dotenv::dotenv;
use std::env;
use log::info;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    info!("Loaded environment variables");

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    info!("Database URL: {}", database_url);

    startup::run_server(&database_url).await
}
