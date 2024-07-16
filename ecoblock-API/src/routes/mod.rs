use actix_web::web;

mod posts;
mod products;
pub(crate) mod users;

pub fn init_routes(cfg: &mut web::ServiceConfig, api_key: String) {
    users::routes::init_user_routes(cfg, api_key.clone());
    posts::routes::init_post_routes(cfg);
    products::routes::init_product_routes(cfg);
}
