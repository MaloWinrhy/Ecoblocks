use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use sqlx::PgPool;
use dotenv::dotenv;
use std::env;

async fn index() -> impl Responder {
    "Hello, world!"
}

async fn check_db(pool: web::Data<PgPool>) -> impl Responder {
    match sqlx::query("SELECT 1").fetch_one(pool.get_ref()).await {
        Ok(_) => {
            println!("Successfully connected to the database");
            HttpResponse::Ok().body("Database connection is OK")
        }
        Err(err) => {
            println!("Failed to connect to the database: {:?}", err);
            HttpResponse::InternalServerError().body("Failed to connect to the database")
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    println!("Loaded environment variables");

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    println!("Database URL: {}", database_url);

    let pool = match PgPool::connect(&database_url).await {
        Ok(pool) => {
            println!("Successfully created the connection pool");
            pool
        }
        Err(err) => {
            println!("Failed to create pool: {:?}", err);
            return Err(std::io::Error::new(std::io::ErrorKind::Other, "Failed to create pool"));
        }
    };

    println!("Starting server at http://0.0.0.0:8080");
    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .route("/", web::get().to(index))
            .route("/health", web::get().to(check_db))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
