use actix_web::web;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .service(web::resource("/posts")
            .route(web::post().to(crate::handlers::post::create_post_handler))
            .route(web::get().to(crate::handlers::post::get_all_posts_handler)))
        .service(web::resource("/posts/{id}")
            .route(web::get().to(crate::handlers::post::get_post_by_id_handler))
            .route(web::put().to(crate::handlers::post::update_post_handler))
            .route(web::delete().to(crate::handlers::post::delete_post_handler)));
}
