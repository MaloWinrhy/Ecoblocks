extern crate diesel;
extern crate dotenvy;

use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use dotenvy::dotenv;
use crate::config::Config;
use crate::db::establish_connection;
use crate::handlers::{index, test_db_connection};

mod config;
mod db;
mod handlers;
//mod models;
//mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let config = Config::from_env().expect("Failed to load configuration");

    match establish_connection(&config.database_url) {
        Ok(_) => {
            println!("Connected to the database successfully!");
        }
        Err(err) => {
            eprintln!("Failed to connect to the database: {}", err);
            std::process::exit(1);
        }
    }

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .route("/test_db_connection", web::get().to(test_db_connection))
    })
    .bind(config.server_address)?
    .run()
    .await
}
