use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use crate::schema::users;
use chrono::NaiveDateTime;

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = users)]
pub struct User {
    pub id: i64,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub role: String,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub id: i64,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub role: String,
}

#[derive(Deserialize)]

pub struct UpdateUserProfileRequest {
    pub new_username: Option<String>,
    pub new_email: Option<String>,
    pub password: Option<String>,

}
