use diesel::prelude::*;
use crate::routes::users::models::{User, NewUser};
use crate::schema::users;
use crate::utils::snowflake_generator::generate_id;

pub fn create_user(conn: &mut PgConnection, username: &str, email: &str, password_hash: &str, role: &str) -> QueryResult<User> {
    let new_user = NewUser {
        id: generate_id(),
        username: username.to_string(),
        email: email.to_string(),
        password_hash: password_hash.to_string(),
        role: role.to_string(),
    };

    diesel::insert_into(users::table)
        .values(&new_user)
        .get_result(conn)
}

pub fn update_user_role(conn: &mut PgConnection, user_id: i64, new_role: &str) -> QueryResult<User> {
    diesel::update(users::table.find(user_id))
        .set(users::role.eq(new_role))
        .get_result(conn)
}

pub fn get_user_by_id(conn: &mut PgConnection, user_id: i64) -> QueryResult<User> {
    users::table.find(user_id).get_result(conn)
}

pub fn get_all_users(conn: &mut PgConnection) -> QueryResult<Vec<User>> {
    users::table.load(conn)
}

pub fn update_user_email(conn: &mut PgConnection, user_id: i64, new_email: &str) -> QueryResult<User> {
    diesel::update(users::table.find(user_id))
        .set(users::email.eq(new_email))
        .get_result(conn)
}

pub fn delete_user(conn: &mut PgConnection, user_id: i64) -> QueryResult<usize> {
    diesel::delete(users::table.find(user_id)).execute(conn)
}
