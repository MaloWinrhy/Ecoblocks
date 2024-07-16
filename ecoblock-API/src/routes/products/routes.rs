use actix_web::web;
use crate::middleware::auth::Auth;
use crate::middleware::api_key::ApiKeyAuth;

pub fn init_product_routes(cfg: &mut web::ServiceConfig, api_key: String) {
    cfg
        .service(
            web::resource("/products")
                .route(web::get().to(crate::routes::products::handlers::get_all_products_handler))
                .route(web::post().to(crate::routes::products::handlers::create_product_handler).wrap(Auth { required_role: Some("ADMIN".to_string()) }))
                .wrap(ApiKeyAuth { api_key: api_key.clone() })
        )
        .service(
            web::resource("/products/{id}")
                .route(web::get().to(crate::routes::products::handlers::get_product_by_id_handler))
                .route(web::delete().to(crate::routes::products::handlers::delete_product_handler).wrap(Auth { required_role: Some("ADMIN".to_string()) }))
                .route(web::put().to(crate::routes::products::handlers::update_product_handler).wrap(Auth { required_role: Some("ADMIN".to_string()) }))
                .wrap(ApiKeyAuth { api_key: api_key.clone() })
        );
}
