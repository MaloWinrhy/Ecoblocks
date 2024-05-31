pub mod health_check;
pub mod auth;
pub mod users;
pub mod blog;
pub mod logger;

use actix_web::web;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    // health_check::routes::init_routes(cfg);
    // auth::routes::init_routes(cfg);
    // users::routes::init_routes(cfg);
    // blog::routes::init_routes(cfg);
    // blockchain::routes::init_routes(cfg);
}
