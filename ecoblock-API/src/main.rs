extern crate diesel;
extern crate dotenvy;

use actix_web::{web, App, HttpServer};
use diesel::r2d2::{self, ConnectionManager};
use diesel::pg::PgConnection;
use dotenvy::dotenv;
use crate::config::Config;
use crate::users::{index, test_db_connection, create_user_handler};

mod config;
mod db;
mod schema;
mod users;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let config = Config::from_env().expect("Failed to load configuration");

    let manager = ConnectionManager::<PgConnection>::new(&config.database_url);
    let pool = r2d2::Pool::builder().build(manager).expect("Failed to create pool.");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(config.database_url.clone()))
            .route("/", web::get().to(index))
            .route("/test_db_connection", web::get().to(test_db_connection))
            .route("/create_user", web::post().to(create_user_handler))
    })
    .bind(config.server_address)?
    .run()
    .await
}
