use actix_web::{web, HttpResponse, Responder};

pub async fn login() -> impl Responder {
    HttpResponse::Ok().body("Login")
}

pub async fn register() -> impl Responder {
    HttpResponse::Ok().body("Register")
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/login").route(web::post().to(login)));
    cfg.service(web::resource("/register").route(web::post().to(register)));
}
