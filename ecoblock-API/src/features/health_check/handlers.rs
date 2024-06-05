use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use log::info;

pub async fn basic_health_check() -> impl Responder {
    HttpResponse::Ok().body("Health check OK")
}

pub async fn database_health_check(pool: web::Data<PgPool>) -> impl Responder {
    match sqlx::query("SELECT 1").fetch_one(pool.get_ref()).await {
        Ok(_) => {
            info!("Successfully connected to the database");
            HttpResponse::Ok().body("Database connection is OK")
        }
        Err(err) => {
            log::error!("Failed to connect to the database: {:?}", err);
            HttpResponse::InternalServerError().body("Failed to connect to the database")
        }
    }
}

pub async fn detailed_health_check(pool: web::Data<PgPool>) -> impl Responder {
    let db_status = match sqlx::query("SELECT 1").fetch_one(pool.get_ref()).await {
        Ok(_) => "Database connection is OK",
        Err(_) => "Failed to connect to the database",
    };

    let details = format!("Health check OK\n{}", db_status);

    HttpResponse::Ok().body(details)
}
