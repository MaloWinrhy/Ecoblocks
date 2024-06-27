use actix_web::body::BoxBody;
use actix_web::{dev::ServiceRequest, dev::ServiceResponse, Error, HttpMessage, HttpResponse};
use actix_service::{Service, Transform};
use futures::future::{ok, Ready, LocalBoxFuture};
use futures::FutureExt;
use jsonwebtoken::{decode, Validation, DecodingKey};
use std::task::{Context, Poll};
use std::env;
use log::error;
use crate::routes::users::auth::Claims;

pub struct Auth {
    pub required_role: Option<String>,
}

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
        ok(AuthMiddleware {
            service,
            required_role: self.required_role.clone(),
        })
    }
}

pub struct AuthMiddleware<S> {
    service: S,
    required_role: Option<String>,
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
        if req.path().starts_with("/login") || req.path().starts_with("/create_user") {
            return self.service.call(req).boxed_local();
        }

        let auth_header = req.headers().get("Authorization");

        if let Some(auth_header) = auth_header {
            if let Ok(auth_str) = auth_header.to_str() {
                if auth_str.starts_with("Bearer ") {
                    let token = &auth_str[7..];
                    let secret = env::var("SECRET_KEY").expect("SECRET_KEY must be set");
                    let token_data = decode::<Claims>(&token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default());

                    if let Ok(token_data) = token_data {
                        let mut claims = token_data.claims;
                        if let Some(ref required_role) = self.required_role {
                            if claims.role != *required_role {
                                error!("User does not have the required role: {}", required_role);
                                let (req, _pl) = req.into_parts();
                                let res = HttpResponse::Forbidden().finish().map_into_boxed_body();
                                let srv_res = ServiceResponse::new(req, res);
                                return ok(srv_res).boxed_local();
                            }
                        }
                        req.extensions_mut().insert(claims);
                        return self.service.call(req).boxed_local();
                    } else {
                        error!("Token decoding failed: {:?}", token_data.err());
                    }
                } else {
                    error!("Authorization header does not start with Bearer");
                }
            } else {
                error!("Invalid Authorization header");
            }
        } else {
            error!("No Authorization header found");
        }

        let (req, _pl) = req.into_parts();
        let res = HttpResponse::Unauthorized().finish().map_into_boxed_body();
        let srv_res = ServiceResponse::new(req, res);
        ok(srv_res).boxed_local()
    }
}
