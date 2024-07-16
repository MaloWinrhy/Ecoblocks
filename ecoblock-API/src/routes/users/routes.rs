use actix_web::web;
use crate::routes::users::handlers::*;
use crate::routes::users::auth::login_handler;
use crate::middleware::auth::Auth;
use crate::middleware::api_key::ApiKeyAuth;

pub fn init_user_routes(cfg: &mut web::ServiceConfig, api_key: String) {
    cfg.service(
        web::resource("/create_user")
            .route(web::post().to(create_user_handler))
            .wrap(ApiKeyAuth { api_key: api_key.clone() })
    )
    .service(
        web::resource("/login")
            .route(web::post().to(login_handler))
            .wrap(ApiKeyAuth { api_key: api_key.clone() })
    )
    .service(
        web::resource("/profile")
            .route(web::get().to(get_profile_handler).wrap(Auth { required_role: None }))
            .wrap(ApiKeyAuth { api_key: api_key.clone() })
    )
    .service(
        web::resource("/user/{id}")
            .route(web::get().to(get_user_by_id_handler).wrap(Auth { required_role: None }))
            .route(web::delete().to(delete_user_handler).wrap(Auth { required_role: Some("ADMIN".to_string()) }))
            .wrap(ApiKeyAuth { api_key: api_key.clone() })
    )
    .service(
        web::resource("/users")
            .route(web::get().to(get_all_users_handler).wrap(Auth { required_role: Some("ADMIN".to_string()) }))
            .wrap(ApiKeyAuth { api_key: api_key.clone() })
    )
    .service(
        web::resource("/user/{id}/email")
            .route(web::put().to(update_user_email_handler).wrap(Auth { required_role: Some("ADMIN".to_string()) }))
            .wrap(ApiKeyAuth { api_key: api_key.clone() })
    )
    .service(
        web::resource("/user/{id}/role")
            .route(web::put().to(update_user_role_handler).wrap(Auth { required_role: Some("ADMIN".to_string()) }))
            .wrap(ApiKeyAuth { api_key: api_key.clone() })
    );
}
