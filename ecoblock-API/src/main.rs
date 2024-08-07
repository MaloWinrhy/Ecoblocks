use std::sync::Arc;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use diesel::r2d2::{self, ConnectionManager};
use diesel::pg::PgConnection;
use dotenvy::dotenv;
use env_logger;
use log::info;

mod schema;
mod config;
mod db;
mod routes;
mod utils;
mod middleware;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    env_logger::init();

    let config = Arc::new(config::Config::from_env().expect("Failed to load configuration"));

    let manager = ConnectionManager::<PgConnection>::new(&config.database_url);
    let pool = r2d2::Pool::builder().build(manager).expect("Failed to create pool.");

    info!("Starting server at http://0.0.0.0:8000");

    HttpServer::new(move || {
        let api_key = config.api_key.clone();
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header()
                    .expose_headers(vec!["X-Total-Count"])
                    .max_age(3600)
            )
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(config.clone()))
            .configure(|cfg| routes::init_routes(cfg, api_key.clone()))
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}
