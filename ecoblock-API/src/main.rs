use actix_web::{web, App, HttpServer};

mod lib;
mod startup;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize your application state
    let app_state = web::Data::new(lib::AppState::new());

    // Configure and start the HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone()) // Share the application state
            .configure(startup::config) // Configure routes and middleware
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}