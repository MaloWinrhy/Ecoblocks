use actix_web::web;
use super::handlers::{get_logs};

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/logs")
            .route("", web::get().to(get_logs)),
    );
}
