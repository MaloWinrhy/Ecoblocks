use actix_web::{Responder, HttpResponse, web};
use serde::{Serialize, Deserialize};
use crate::db::establish_connection;
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};
use crate::routes::users::actions::{create_user, get_user_by_id, get_all_users, update_user_email, delete_user};
use bcrypt::{hash, DEFAULT_COST};

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[derive(Serialize)]
struct DbConnectionStatus {
    status: String,
    message: String,
}

#[derive(Serialize)]
struct ApiResponse<T> {
    status: String,
    data: T,
}

#[derive(Serialize)]
struct ApiError {
    status: String,
    message: String,
}

pub async fn index() -> impl Responder {
    HttpResponse::Ok().json(ApiResponse {
        status: "success".to_string(),
        data: "Hello, world!".to_string(),
    })
}

pub async fn test_db_connection(database_url: web::Data<String>) -> impl Responder {
    match establish_connection(&database_url) {
        Ok(_) => HttpResponse::Ok().json(DbConnectionStatus {
            status: "success".to_string(),
            message: "Connected to the database successfully!".to_string(),
        }),
        Err(err) => HttpResponse::InternalServerError().json(ApiError {
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

#[derive(Serialize)]
pub struct UserResponse {
    id: i32,
    username: String,
    email: String,
}

pub async fn create_user_handler(
    pool: web::Data<DbPool>,
    item: web::Json<CreateUserRequest>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    let password_hash = hash_password(&item.password); // Assurez-vous d'avoir une fonction de hachage

    match create_user(&mut conn, &item.username, &item.email, &password_hash) {
        Ok(user) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: UserResponse {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to create user".to_string(),
        }),
    }
}

pub async fn get_user_by_id_handler(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match get_user_by_id(&mut conn, *user_id) {
        Ok(user) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: UserResponse {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "User not found".to_string(),
        }),
    }
}

pub async fn get_all_users_handler(
    pool: web::Data<DbPool>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match get_all_users(&mut conn) {
        Ok(users) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: users.into_iter().map(|user| UserResponse {
                id: user.id,
                username: user.username,
                email: user.email,
            }).collect::<Vec<UserResponse>>(),
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to fetch users".to_string(),
        }),
    }
}

#[derive(Deserialize)]
pub struct UpdateUserEmailRequest {
    new_email: String,
}

pub async fn update_user_email_handler(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
    item: web::Json<UpdateUserEmailRequest>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match update_user_email(&mut conn, *user_id, &item.new_email) {
        Ok(user) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: UserResponse {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to update user email".to_string(),
        }),
    }
}

pub async fn delete_user_handler(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match delete_user(&mut conn, *user_id) {
        Ok(_) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: format!("User with ID {} deleted successfully", user_id),
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to delete user".to_string(),
        }),
    }
}


fn hash_password(password: &str) -> String {
    hash(password, DEFAULT_COST).expect("Failed to hash password")
}
