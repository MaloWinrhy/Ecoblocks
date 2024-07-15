use jsonwebtoken::{decode, DecodingKey, Validation, errors::Error};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: i64,
    pub email: String,
    pub role: String,
    pub exp: usize,
}

pub fn decode_jwt(token: &str) -> Result<Claims, Error> {
    let secret = env::var("SECRET_KEY").expect("SECRET_KEY must be set");
    let decoding_key = DecodingKey::from_secret(secret.as_ref());
    let validation = Validation::default();
    let token_data = decode::<Claims>(token, &decoding_key, &validation)?;

    Ok(token_data.claims)
}
