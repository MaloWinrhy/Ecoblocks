use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use diesel::r2d2::{self, ConnectionManager};
use diesel::pg::PgConnection;
use dotenvy::dotenv;

mod schema;
mod config;
mod db;
mod routes;
mod utils;
mod middleware;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let config = config::Config::from_env().expect("Failed to load configuration");

    let manager = ConnectionManager::<PgConnection>::new(&config.database_url);
    let pool = r2d2::Pool::builder().build(manager).expect("Failed to create pool.");

    HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header()
                    .max_age(3600)
            )
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(config.database_url.clone()))
            .configure(routes::init_routes)
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}
