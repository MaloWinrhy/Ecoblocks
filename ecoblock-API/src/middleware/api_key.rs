use actix_web::body::BoxBody;
use actix_web::{dev::ServiceRequest, dev::ServiceResponse, Error, HttpMessage, HttpResponse};
use actix_service::{Service, Transform};
use futures::future::{ok, Ready, LocalBoxFuture};
use futures::FutureExt;
use std::task::{Context, Poll};
use std::rc::Rc;

pub struct ApiKeyAuth {
    pub api_key: String,
}

impl<S> Transform<S, ServiceRequest> for ApiKeyAuth
where
    S: Service<ServiceRequest, Response = ServiceResponse<BoxBody>, Error = Error>,
    S::Future: 'static,
{
    type Response = ServiceResponse<BoxBody>;
    type Error = Error;
    type InitError = ();
    type Transform = ApiKeyAuthMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(ApiKeyAuthMiddleware {
            service: Rc::new(service),
            api_key: self.api_key.clone(),
        })
    }
}

pub struct ApiKeyAuthMiddleware<S> {
    service: Rc<S>,
    api_key: String,
}

impl<S> Service<ServiceRequest> for ApiKeyAuthMiddleware<S>
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
        let auth_header = req.headers().get("x-api-key");

        if let Some(header_value) = auth_header {
            if header_value.to_str().unwrap() == &self.api_key {
                return self.service.call(req).boxed_local();
            } else {
                log::error!("Invalid API key");
            }
        } else {
            log::error!("No API key found in headers");
        }

        let (req, _pl) = req.into_parts();
        let res = HttpResponse::Unauthorized().finish().map_into_boxed_body();
        let srv_res = ServiceResponse::new(req, res);
        ok(srv_res).boxed_local()
    }
}
