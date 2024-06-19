use actix_web::{web, HttpResponse, Responder};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use crate::db::DbPool;
use crate::routes::users::models::User;
use crate::schema::users::dsl::{users, email as user_email};
use bcrypt::verify;
use jsonwebtoken::{encode, Header, EncodingKey};
use std::env;

#[derive(Deserialize)]
pub struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    token: String,
}

#[derive(Serialize, Deserialize)]
pub struct Claims {  // Make this public
    sub: i64,
    email: String,
    exp: usize,
}

pub async fn login_handler(pool: web::Data<DbPool>, item: web::Json<LoginRequest>) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");
    let user = users.filter(user_email.eq(&item.email))
        .first::<User>(&mut conn)  // Make `conn` mutable
        .optional()
        .expect("Failed to find user");

    if let Some(user) = user {
        if verify(&item.password, &user.password_hash).unwrap_or(false) {
            let exp = chrono::Utc::now()
                .checked_add_signed(chrono::Duration::days(1))
                .expect("valid timestamp")
                .timestamp();
            let claims = Claims { sub: user.id, email: user.email.clone(), exp: exp as usize };
            let secret = env::var("SECRET_KEY").expect("SECRET_KEY must be set");
            let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref())).unwrap();

            return HttpResponse::Ok().json(LoginResponse { token });
        }
    }

    HttpResponse::Unauthorized().body("Invalid email or password")
}
