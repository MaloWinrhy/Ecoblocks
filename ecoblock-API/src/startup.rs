use actix_web::{web, App, HttpServer};
use sqlx::PgPool;
use crate::features::{index, init_routes};

pub fn configure_services(cfg: &mut web::ServiceConfig, pool: PgPool) {
    cfg
        .data(pool.clone())
        .route("/", web::get().to(index))
        .configure(init_routes);
}

pub async fn run_server(database_url: &str) -> std::io::Result<()> {
    let pool = PgPool::connect(database_url).await.expect("Failed to create pool.");

    HttpServer::new(move || {
        App::new()
            .configure(|cfg| configure_services(cfg, pool.clone()))
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}
