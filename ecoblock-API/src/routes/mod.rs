use actix_web::web;

mod posts;
mod products;
pub(crate) mod users;


pub fn init_routes(cfg: &mut web::ServiceConfig) {
    users::routes::init_user_routes(cfg);
    posts::routes::init_post_routes(cfg);
    products::routes::init_product_routes(cfg);
}
