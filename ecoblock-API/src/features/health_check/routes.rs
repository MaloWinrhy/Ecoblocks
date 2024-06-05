use actix_web::web;
use super::handlers::{basic_health_check, database_health_check, detailed_health_check};

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/health")
            .route("", web::get().to(basic_health_check))
            .route("/db", web::get().to(database_health_check))
            .route("/detailed", web::get().to(detailed_health_check)),
    );
}
