pub mod health_check;
pub mod logger;
pub mod auth;
pub mod users;
pub mod blog;

use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use log::{info, error};

pub async fn index() -> impl Responder {
    "Hello, world!"
}

pub async fn check_db(pool: web::Data<PgPool>) -> impl Responder {
    match sqlx::query("SELECT 1").fetch_one(pool.get_ref()).await {
        Ok(_) => {
            info!("Successfully connected to the database");
            HttpResponse::Ok().body("Database connection is OK")
        }
        Err(err) => {
            error!("Failed to connect to the database: {:?}", err);
            HttpResponse::InternalServerError().body("Failed to connect to the database")
        }
    }
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    health_check::init_routes(cfg);
    // logger::init_routes(cfg);
    // auth::init_routes(cfg);
    // users::init_routes(cfg);
    // blog::init_routes(cfg);
}
