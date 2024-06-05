pub mod health_check;
pub mod logger;
pub mod auth;
pub mod users;
pub mod blog;

use actix_web::{web, HttpResponse, Responder};

pub async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello, world!")
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    health_check::routes::init_routes(cfg);
    logger::routes::init_routes(cfg);
    // auth::routes::init_routes(cfg);
    // users::routes::init_routes(cfg);
    // blog::routes::init_routes(cfg);
}
