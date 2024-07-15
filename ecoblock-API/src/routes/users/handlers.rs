use actix_web::error::InternalError;
use actix_web::{web, HttpRequest, HttpResponse, Error};
use serde::{Serialize, Deserialize};
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};
use crate::routes::users::actions::{create_user, get_user_by_id, get_all_users,update_user_role, update_user_email, delete_user};
use bcrypt::{hash, DEFAULT_COST};
use log::error;
use lettre::message::{Message, SinglePart};
use lettre::{AsyncSmtpTransport, AsyncTransport};
use lettre::Tokio1Executor;
use lettre::transport::smtp::authentication::Credentials;
use regex::Regex;
use crate::utils::decode_jwt::decode_jwt;

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
    role: Option<String>,
}
const VALID_ROLES: &[&str] = &["user", "ADMIN"];


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
    if !validate_password(&item.password) {
        return HttpResponse::BadRequest().json(ApiError {
            status: "error".to_string(),
            message: "Password does not meet complexity requirements".to_string(),
        });
    }

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

    let role = item.role.as_deref().unwrap_or("user"); // Use "user" if role is None
    let role = if VALID_ROLES.contains(&role) { role } else { "user" };

    match create_user(&mut conn, &item.username, &item.email, &password_hash, role) {
        Ok(user) => {
            if let Err(e) = send_confirmation_email(&item.email).await {
                error!("Failed to send confirmation email: {}", e);
            }

            HttpResponse::Ok().json(UserResponse {
                id: user.id,
                username: user.username,
                email: user.email,
            })
        },
        Err(e) => {
            error!("Failed to create user: {}", e);
            HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "Failed to create user".to_string(),
            })
        },
    }
}


fn hash_password(password: &str) -> Result<String, bcrypt::BcryptError> {
    hash(password, DEFAULT_COST)
}

async fn send_confirmation_email(recipient_email: &str) -> Result<(), Box<dyn std::error::Error>> {
    let email = Message::builder()
        .from("your-email@example.com".parse()?)
        .to(recipient_email.parse()?)
        .subject("Confirmation de création de compte")
        .singlepart(SinglePart::plain("Votre compte a été créé avec succès.".to_string()))?;

    let creds = Credentials::new("smtp-username".to_string(), "smtp-password".to_string());

    let mailer: AsyncSmtpTransport<Tokio1Executor> = AsyncSmtpTransport::<Tokio1Executor>::relay("smtp.example.com")?
        .credentials(creds)
        .build();

    mailer.send(email).await?;

    Ok(())
}

fn validate_password(password: &str) -> bool {
    let length_ok = password.len() >= 8;
    let has_uppercase = Regex::new(r"[A-Z]").unwrap().is_match(password);
    let has_lowercase = Regex::new(r"[a-z]").unwrap().is_match(password);
    let has_digit = Regex::new(r"\d").unwrap().is_match(password);

    length_ok && has_uppercase && has_lowercase && has_digit
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
        Ok(users) => {
            let total_count = users.len();
            let user_responses: Vec<UserResponse> = users.into_iter().map(|user| UserResponse {
                id: user.id,
                username: user.username,
                email: user.email,
            }).collect();

            HttpResponse::Ok()
                .insert_header(("X-Total-Count", total_count.to_string()))
                .json(user_responses)
        }
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
#[derive(Serialize)]
pub struct ApiResponse<T> {
    status: String,
    message: T,
}

pub async fn get_profile_handler(
    pool: web::Data<DbPool>,
    req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let mut conn = pool.get().expect("Failed to get DB connection");

    let auth_header = match req.headers().get("Authorization") {
        Some(header) => header.to_str().unwrap(),
        None => return Err(InternalError::from_response("Unauthorized", HttpResponse::Unauthorized().body("No authorization header")).into()),
    };

    let token = auth_header.split(" ").collect::<Vec<&str>>()[1];

    let claims = decode_jwt(token).map_err(|e| {
        error!("Failed to decode JWT token: {:?}", e);
        InternalError::from_response("Invalid token", HttpResponse::Unauthorized().body("Invalid token"))
    })?;

    match get_user_by_id(&mut conn, claims.sub) {
        Ok(user) => Ok(HttpResponse::Ok().json(UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,
        })),
        Err(e) => {
            error!("Failed to get user by ID: {}", e);
            Err(InternalError::from_response("User not found", HttpResponse::InternalServerError().json(ApiError {
                status: "error".to_string(),
                message: "User not found".to_string(),
            })).into())
        },
    }
}
