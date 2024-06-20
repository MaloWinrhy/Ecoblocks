use actix_web::web;

pub fn init_product_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .route("/products", web::post().to(crate::routes::products::handlers::create_product_handler))
        .route("/products/{id}", web::get().to(crate::routes::products::handlers::get_product_by_id_handler))
        .route("/products", web::get().to(crate::routes::products::handlers::get_all_products_handler))
        .route("/products/{id}", web::delete().to(crate::routes::products::handlers::delete_product_handler));
}
