use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use log::{info, error};

pub async fn basic_health_check() -> impl Responder {
    info!("Performing basic health check");
    HttpResponse::Ok().body("Health check OK")
}

pub async fn database_health_check(pool: web::Data<PgPool>) -> impl Responder {
    info!("Checking database connection");
    match sqlx::query("SELECT 1").fetch_one(pool.get_ref()).await {
        Ok(_) => {
            info!("Successfully connected to the database");
            HttpResponse::Ok().body("Database connection is OK")
        }
        Err(err) => {
            error!("Failed to connect to the database: {:?}", err);
            HttpResponse::InternalServerError().body("Failed to connect to the database")
        }
    }
}

pub async fn detailed_health_check(pool: web::Data<PgPool>) -> impl Responder {
    info!("Performing detailed health check");
    let db_status = match sqlx::query("SELECT 1").fetch_one(pool.get_ref()).await {
        Ok(_) => {
            info!("Database connection is OK");
            "Database connection is OK"
        }
        Err(_) => {
            error!("Failed to connect to the database");
            "Failed to connect to the database"
        }
    };

    let details = format!("Health check OK\n{}", db_status);
    HttpResponse::Ok().body(details)
}
