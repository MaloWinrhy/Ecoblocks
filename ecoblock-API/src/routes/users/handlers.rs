use actix_web::{HttpResponse, web};
use serde::{Serialize, Deserialize};
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};
use crate::routes::users::actions::{create_user, get_user_by_id, get_all_users,update_user_role, update_user_email, delete_user};
use bcrypt::{hash, DEFAULT_COST};
use log::error;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[derive(Serialize)]
pub struct ApiError {
    status: String,
    message: String,
}

#[derive(Deserialize)]
pub struct CreateUserRequest {
    username: String,
    email: String,
    password: String,
    role: String,
}

#[derive(Serialize)]
pub struct UserResponse {
    id: i64,
    username: String,
    email: String,
}

pub async fn create_user_handler(
    pool: web::Data<DbPool>,
    item: web::Json<CreateUserRequest>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    let password_hash = match hash_password(&item.password) {
        Ok(hash) => hash,
        Err(e) => {
            error!("Failed to hash password: {}", e);
            return HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "Internal server error".to_string(),
            });
        }
    };

    match create_user(&mut conn, &item.username, &item.email, &password_hash, &item.role) {
        Ok(user) => HttpResponse::Ok().json(UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,
        }),
        Err(e) => {
            error!("Failed to create user: {}", e);
            HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "Failed to create user".to_string(),
            })
        },
    }
}
#[derive(Deserialize)]
pub struct UpdateUserRoleRequest {
    new_role: String,
}

pub async fn update_user_role_handler(
    pool: web::Data<DbPool>,
    user_id: web::Path<i64>,
    item: web::Json<UpdateUserRoleRequest>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match update_user_role(&mut conn, *user_id, &item.new_role) {
        Ok(user) => HttpResponse::Ok().json(UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,
        }),
        Err(e) => {
            error!("Failed to update user role: {}", e);
            HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "Failed to update user role".to_string(),
            })
        },
    }
}

pub async fn get_user_by_id_handler(
    pool: web::Data<DbPool>,
    user_id: web::Path<i64>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match get_user_by_id(&mut conn, *user_id) {
        Ok(user) => HttpResponse::Ok().json(UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,

        }),
        Err(e) => {
            error!("Failed to get user by ID: {}", e);
            HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "User not found".to_string(),
            })
        },
    }
}

pub async fn get_all_users_handler(
    pool: web::Data<DbPool>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match get_all_users(&mut conn) {
        Ok(users) => HttpResponse::Ok().json(users.into_iter().map(|user| UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,

        }).collect::<Vec<UserResponse>>()),
        Err(e) => {
            error!("Failed to fetch users: {}", e);
            HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "Failed to fetch users".to_string(),
            })
        },
    }
}

#[derive(Deserialize)]
pub struct UpdateUserEmailRequest {
    new_email: String,
}

pub async fn update_user_email_handler(
    pool: web::Data<DbPool>,
    user_id: web::Path<i64>,
    item: web::Json<UpdateUserEmailRequest>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match update_user_email(&mut conn, *user_id, &item.new_email) {
        Ok(user) => HttpResponse::Ok().json(UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,

        }),
        Err(e) => {
            error!("Failed to update user email: {}", e);
            HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "Failed to update user email".to_string(),
            })
        },
    }
}

pub async fn delete_user_handler(
    pool: web::Data<DbPool>,
    user_id: web::Path<i64>,
) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match delete_user(&mut conn, *user_id) {
        Ok(_) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            message: format!("User with ID {} deleted successfully", user_id),
        }),
        Err(e) => {
            error!("Failed to delete user: {}", e);
            HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "Failed to delete user".to_string(),
            })
        },
    }
}

fn hash_password(password: &str) -> Result<String, bcrypt::BcryptError> {
    hash(password, DEFAULT_COST)
}

#[derive(Serialize)]
pub struct ApiResponse<T> {
    status: String,
    message: T,
}
