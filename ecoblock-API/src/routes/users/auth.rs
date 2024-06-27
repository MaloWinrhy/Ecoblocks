use actix_web::{web, HttpResponse, Responder};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use crate::db::DbPool;
use crate::routes::users::models::User;
use crate::schema::users::dsl::{users, email as user_email};
use bcrypt::verify;
use jsonwebtoken::{encode, Header, EncodingKey};
use std::env;
use log::{error, info};

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
pub struct Claims {
    pub sub: i64,
    pub email: String,
    pub role: String,
    pub exp: usize,
}

pub async fn login_handler(pool: web::Data<DbPool>, item: web::Json<LoginRequest>) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");

    // Ajouter des logs
    info!("Attempting to find user with email: {}", item.email);

    let user = match users.filter(user_email.eq(&item.email)).first::<User>(&mut conn).optional() {
        Ok(Some(user)) => {
            info!("User found: {:?}", user);
            user
        },
        Ok(None) => {
            info!("No user found with email: {}", item.email);
            return HttpResponse::Unauthorized().body("Invalid email or password");
        },
        Err(e) => {
            error!("Error querying user: {}", e);
            return HttpResponse::InternalServerError().body("Internal server error");
        },
    };

    // Vérifier le mot de passe
    if verify(&item.password, &user.password_hash).unwrap_or(false) {
        info!("Password verification successful for user: {}", user.email);
        let exp = chrono::Utc::now()
            .checked_add_signed(chrono::Duration::days(1))
            .expect("valid timestamp")
            .timestamp();
        let claims = Claims { sub: user.id, email: user.email.clone(), role: user.role.clone(), exp: exp as usize };

        // Charger la clé secrète
        let secret = match env::var("SECRET_KEY") {
            Ok(secret) => secret,
            Err(e) => {
                error!("SECRET_KEY not set: {}", e);
                return HttpResponse::InternalServerError().body("Internal server error");
            },
        };

        // Générer le token JWT
        let token = match encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref())) {
            Ok(token) => token,
            Err(e) => {
                error!("Error encoding token: {}", e);
                return HttpResponse::InternalServerError().body("Internal server error");
            },
        };

        info!("User {} logged in successfully", user.email);
        return HttpResponse::Ok().json(LoginResponse { token });
    } else {
        info!("Password verification failed for user {}", user.email);
    }

    HttpResponse::Unauthorized().body("Invalid email or password")
}
