use actix_web::{Responder, HttpResponse, web};
use serde::Serialize;
use crate::db::establish_connection;

#[derive(Serialize)]
struct DbConnectionStatus {
    status: String,
    message: String,
}

pub async fn index() -> impl Responder {
    "Hello, world!"
}

pub async fn test_db_connection(database_url: web::Data<String>) -> impl Responder {
    match establish_connection(&database_url) {
        Ok(_) => HttpResponse::Ok().json(DbConnectionStatus {
            status: "success".to_string(),
            message: "Connected to the database successfully!".to_string(),
        }),
        Err(err) => HttpResponse::InternalServerError().json(DbConnectionStatus {
            status: "error".to_string(),
            message: format!("Failed to connect to the database: {}", err),
        }),
    }
}
