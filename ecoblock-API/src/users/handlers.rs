use actix_web::{Responder, HttpResponse, web};
use serde::{Serialize, Deserialize};
use crate::db::establish_connection;
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};
use crate::users::actions::create_user;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

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

#[derive(Deserialize)]
pub struct CreateUserRequest {
    username: String,
    email: String,
    password: String,
}

pub async fn create_user_handler(
    pool: web::Data<DbPool>,
    item: web::Json<CreateUserRequest>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    let password_hash = hash_password(&item.password); // Assurez-vous d'avoir une fonction de hachage

    match create_user(&mut conn, &item.username, &item.email, &password_hash) {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(_) => HttpResponse::InternalServerError().into(),
    }
}

// Fonction de hachage fictive, utilisez une bibliothèque réelle comme bcrypt
fn hash_password(password: &str) -> String {
    password.to_string() // Remplacez par un hachage réel
}
