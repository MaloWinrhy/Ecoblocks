use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use crate::schema::products;
use chrono::NaiveDateTime;

#[derive(Queryable, Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = products)]
pub struct Product {
    pub id: i64,
    pub title: String,
    pub content: String,
    pub image: Option<String>,
    pub tags: Vec<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = products)]
pub struct NewProduct {
    pub id: i64,
    pub title: String,
    pub content: String,
    pub image: Option<String>,
    pub tags: Vec<String>,
}
