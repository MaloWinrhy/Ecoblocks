use actix_web::body::BoxBody;
use actix_web::{dev::ServiceRequest, dev::ServiceResponse, Error, HttpMessage, HttpResponse};
use actix_service::{Service, Transform};
use futures::future::{ok, Ready, LocalBoxFuture};
use futures::FutureExt;
use jsonwebtoken::{decode, Validation, DecodingKey};
use std::task::{Context, Poll};
use std::env;
use crate::routes::users::auth::Claims;

pub struct Auth;

impl<S> Transform<S, ServiceRequest> for Auth
where
    S: Service<ServiceRequest, Response = ServiceResponse<BoxBody>, Error = Error>,
    S::Future: 'static,
{
    type Response = ServiceResponse<BoxBody>;
    type Error = Error;
    type InitError = ();
    type Transform = AuthMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(AuthMiddleware { service })
    }
}

pub struct AuthMiddleware<S> {
    service: S,
}

impl<S> Service<ServiceRequest> for AuthMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<BoxBody>, Error = Error>,
    S::Future: 'static,
{
    type Response = ServiceResponse<BoxBody>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    fn poll_ready(&self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let auth_header = req.headers().get("Authorization");

        if let Some(auth_header) = auth_header {
            if let Ok(auth_str) = auth_header.to_str() {
                if auth_str.starts_with("Bearer ") {
                    let token = &auth_str[7..];
                    let secret = env::var("SECRET_KEY").expect("SECRET_KEY must be set");
                    let token_data = decode::<Claims>(&token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default());

                    if let Ok(token_data) = token_data {
                        req.extensions_mut().insert(token_data.claims);
                        return self.service.call(req).boxed_local();
                    }
                }
            }
        }

        let (req, _pl) = req.into_parts();
        let res = HttpResponse::Unauthorized().finish().map_into_boxed_body();
        let srv_res = ServiceResponse::new(req, res);
        ok(srv_res).boxed_local()
    }
}
