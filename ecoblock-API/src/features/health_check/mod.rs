pub mod handlers;
pub mod routes;

pub fn init_routes(cfg: &mut actix_web::web::ServiceConfig) {
    routes::init_routes(cfg);
}
