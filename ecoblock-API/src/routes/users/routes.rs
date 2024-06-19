use actix_web::web;

pub fn init_user_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .route("/create_user", web::post().to(crate::routes::users::handlers::create_user_handler))
        .route("/user/{id}", web::get().to(crate::routes::users::handlers::get_user_by_id_handler))
        .route("/users", web::get().to(crate::routes::users::handlers::get_all_users_handler))
        .route("/user/{id}", web::put().to(crate::routes::users::handlers::update_user_email_handler))
        .route("/user/{id}", web::delete().to(crate::routes::users::handlers::delete_user_handler));
}
