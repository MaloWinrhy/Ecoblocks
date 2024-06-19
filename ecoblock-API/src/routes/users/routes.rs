use actix_web::web;
use crate::routes::users::handlers::*;
use crate::routes::users::auth::login_handler;
use crate::middleware::auth::Auth;

pub fn init_user_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/create_user")
            .route(web::post().to(create_user_handler))
    )
    .service(
        web::resource("/login")
            .route(web::post().to(login_handler))
    )
    .service(
        web::resource("/user/{id}")
            .wrap(Auth)
            .route(web::get().to(get_user_by_id_handler))
            .route(web::delete().to(delete_user_handler))
    )
    .service(
        web::resource("/users")
            .wrap(Auth)
            .route(web::get().to(get_all_users_handler))
    )
    .service(
        web::resource("/user/{id}/email")
            .wrap(Auth)
            .route(web::put().to(update_user_email_handler))
    );
}
