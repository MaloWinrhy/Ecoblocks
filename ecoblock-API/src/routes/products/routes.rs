use actix_web::web;
use crate::middleware::auth::Auth;

pub fn init_product_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
            web::resource("/products")
                .route(web::get().to(crate::routes::products::handlers::get_all_products_handler))
                .wrap(Auth { required_role: Some("ADMIN".to_string()) })
                .route(web::post().to(crate::routes::products::handlers::create_product_handler))
        )
        .service(
            web::resource("/products/{id}")
                .route(web::get().to(crate::routes::products::handlers::get_product_by_id_handler))
                .wrap(Auth { required_role: Some("ADMIN".to_string()) })
                .route(web::delete().to(crate::routes::products::handlers::delete_product_handler))
                .route(web::put().to(crate::routes::products::handlers::update_product_handler))
        );
}
