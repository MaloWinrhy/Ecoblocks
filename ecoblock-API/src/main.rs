use actix_web::{get, web, App, HttpServer, Responder};
//use std::sync::Arc;
//use utoipa::{OpenApi, ToSchema};
//use utoipa_swagger_ui::SwaggerUi;

#[derive(serde::Serialize)]
struct HelloResponse {
    message: String,
}

#[get("/")]
async fn hello() -> impl Responder {
    web::Json(HelloResponse {
        message: "Hello, world!".to_string(),
    })
}

// struct OpenApiDoc;

// impl OpenApi for OpenApiDoc {
//     fn openapi() -> utoipa::openapi::OpenApi {
//         use utoipa::openapi::{InfoBuilder, License, ContactBuilder, OpenApiBuilder};

//         OpenApiBuilder::new()
//             .info(
//                 InfoBuilder::new()
//                     .title("Mon Application")
//                     .version("1.0.0")
//                     .description(Some("Description de l'application"))
//                     .license(Some(License::new("MIT")))
//                     .contact(Some(
//                         ContactBuilder::new()
//                             .name(Some("Nom de l'auteur"))
//                             .email(Some("email@example.com"))
//                             .build(),
//                     ))
//                     .build(),
//             )
//             .paths(utoipa::openapi::path::Paths::new())
//             .components(Some(utoipa::openapi::Components::new()))
//             .build()
//     }
// }

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // let openapi = Arc::new(OpenApiDoc::openapi());

    HttpServer::new(move || {
        // let openapi = openapi.clone();
        App::new()
            .service(hello)
            // .service(SwaggerUi::new("/swagger-ui/{_:.*}").url("/api-docs/openapi.json", openapi))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
