extern crate diesel;
extern crate dotenvy;

use actix_web::{web, App, HttpServer};
use diesel::r2d2::{self, ConnectionManager};
use diesel::pg::PgConnection;
use dotenvy::dotenv;
use crate::config::Config;
use crate::users::routes::init_user_routes;

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
        let app = App::new()
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(config.database_url.clone()))
            .configure(init_user_routes);

        app
    })
    .bind(config.server_address)?
    .run()
    .await
}
