use actix_web::{web, HttpResponse, Responder};
use serde::Serialize;
use diesel::r2d2::{self, ConnectionManager};
use diesel::pg::PgConnection;
use crate::routes::products::actions::{create_product, get_product_by_id, get_all_products, delete_product, update_product};
use crate::routes::products::models::{NewProduct, UpdateProduct};

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

pub async fn create_product_handler(
    pool: web::Data<DbPool>,
    item: web::Json<NewProduct>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match create_product(&mut conn, item.into_inner()) {
        Ok(product) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: product,
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to create product".to_string(),
        }),
    }
}

pub async fn get_product_by_id_handler(
    pool: web::Data<DbPool>,
    product_id: web::Path<i64>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");
    let product_id = product_id.into_inner();

    match get_product_by_id(&mut conn, product_id) {
        Ok(product) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: product,
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "product not found".to_string(),
        }),
    }
}

pub async fn get_all_products_handler(
    pool: web::Data<DbPool>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");

    match get_all_products(&mut conn) {
        Ok(products) => HttpResponse::Ok().json(products),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to fetch products".to_string(),
        }),
    }
}


pub async fn delete_product_handler(
    pool: web::Data<DbPool>,
    product_id: web::Path<i64>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");
    let product_id = product_id.into_inner();

    match delete_product(&mut conn, product_id) {
        Ok(_) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: format!("product with ID {} deleted successfully", product_id),
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to delete product".to_string(),
        }),
    }
}

pub async fn update_product_handler(
    pool: web::Data<DbPool>,
    product_id: web::Path<i64>,
    item: web::Json<UpdateProduct>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");
    let product_id = product_id.into_inner();

    match update_product(&mut conn, product_id, item.into_inner()) {
        Ok(product) => HttpResponse::Ok().json(ApiResponse {
            status: "success".to_string(),
            data: product,
        }),
        Err(_) => HttpResponse::InternalServerError().json(ApiError {
            status: "error".to_string(),
            message: "Failed to update product".to_string(),
        }),
    }
}
