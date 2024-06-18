use actix_web::web;

pub fn init_post_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .route("/posts", web::post().to(crate::routes::posts::handlers::create_post_handler))
        .route("/posts/{id}", web::get().to(crate::routes::posts::handlers::get_post_by_id_handler))
        .route("/posts", web::get().to(crate::routes::posts::handlers::get_all_posts_handler))
        .route("/posts/{id}", web::delete().to(crate::routes::posts::handlers::delete_post_handler));
}
