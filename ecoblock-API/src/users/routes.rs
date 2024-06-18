use actix_web::web;

pub fn init_user_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .route("/", web::get().to(crate::users::handlers::index))
        .route("/test_db_connection", web::get().to(crate::users::handlers::test_db_connection))
        .route("/create_user", web::post().to(crate::users::handlers::create_user_handler));
}
