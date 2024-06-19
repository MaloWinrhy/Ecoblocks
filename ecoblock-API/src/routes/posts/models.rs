use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use crate::schema::posts;
use chrono::NaiveDateTime;

#[derive(Queryable, Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = posts)]
pub struct Post {
    pub id: i64,
    pub title: String,
    pub content: String,
    pub image: Option<String>,
    pub tags: Vec<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = posts)]
pub struct NewPost {
    pub id: i64,
    pub title: String,
    pub content: String,
    pub image: Option<String>,
    pub tags: Vec<String>,
}
