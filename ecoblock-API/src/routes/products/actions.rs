use diesel::prelude::*;
use crate::routes::products::models::{Product, NewProduct, UpdateProduct};
use crate::schema::products::dsl::*;
use diesel::pg::PgConnection;
use crate::utils::snowflake_generator::generate_id;

pub fn create_product(conn: &mut PgConnection, mut new_product: NewProduct) -> QueryResult<Product> {
    new_product.id = generate_id();
    diesel::insert_into(products)
        .values(&new_product)
        .get_result(conn)
}

pub fn get_product_by_id(conn: &mut PgConnection, product_id: i64) -> QueryResult<Product> {
    products.find(product_id).get_result(conn)
}

pub fn get_all_products(conn: &mut PgConnection) -> QueryResult<Vec<Product>> {
    products.load(conn)
}

pub fn delete_product(conn: &mut PgConnection, product_id: i64) -> QueryResult<usize> {
    diesel::delete(products.find(product_id)).execute(conn)
}

pub fn update_product(conn: &mut PgConnection, product_id: i64, updated_product: UpdateProduct) -> QueryResult<Product> {
    diesel::update(products.find(product_id))
        .set(&updated_product)
        .get_result(conn)
}
