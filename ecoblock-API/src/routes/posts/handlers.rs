use actix_web::{web, HttpResponse, Responder};
use serde::Serialize;
use diesel::r2d2::{self, ConnectionManager};
use diesel::pg::PgConnection;
use crate::routes::posts::actions::{create_post, get_post_by_id, get_all_posts, delete_post};
use crate::routes::posts::models::NewPost;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

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

pub async fn create_post_handler(
    pool: web::Data<DbPool>,
    item: web::Json<NewPost>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match create_post(&mut conn, item.into_inner()) {
        Ok(post) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: post,
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to create post".to_string(),
        }),
    }
}

pub async fn get_post_by_id_handler(
    pool: web::Data<DbPool>,
    post_id: web::Path<i64>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");
    let post_id = post_id.into_inner();

    match get_post_by_id(&mut conn, post_id) {
        Ok(post) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: post,
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Post not found".to_string(),
        }),
    }
}

pub async fn get_all_posts_handler(
    pool: web::Data<DbPool>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match get_all_posts(&mut conn) {
        Ok(posts) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: posts,
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to fetch posts".to_string(),
        }),
    }
}

pub async fn delete_post_handler(
    pool: web::Data<DbPool>,
    post_id: web::Path<i64>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");
    let post_id = post_id.into_inner();

    match delete_post(&mut conn, post_id) {
        Ok(_) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: format!("Post with ID {} deleted successfully", post_id),
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to delete post".to_string(),
        }),
    }
}
