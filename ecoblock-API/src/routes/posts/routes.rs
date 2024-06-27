use actix_web::web;
use crate::middleware::auth::Auth;

pub fn init_post_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
            web::resource("/posts")
            .wrap(Auth { required_role: Some("ADMIN".to_string())})
                .route(web::post().to(crate::routes::posts::handlers::create_post_handler))
        )
        .service(
            web::resource("/posts")
                .route(web::get().to(crate::routes::posts::handlers::get_all_posts_handler))
        )
        .service(
            web::resource("/posts/{id}")
                .route(web::get().to(crate::routes::posts::handlers::get_post_by_id_handler))
        )
        .service(
            web::resource("/posts/{id}")
            .wrap(Auth { required_role: Some("ADMIN".to_string())})
                .route(web::get().to(crate::routes::posts::handlers::get_post_by_id_handler))
                .route(web::delete().to(crate::routes::posts::handlers::delete_post_handler))
        );
}
