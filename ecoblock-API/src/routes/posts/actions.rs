use diesel::prelude::*;
use crate::routes::posts::models::{Post, NewPost};
use crate::schema::posts::dsl::*;
use diesel::pg::PgConnection;
use crate::utils::snowflake_generator::generate_id;

pub fn create_post(conn: &mut PgConnection, mut new_post: NewPost) -> QueryResult<Post> {
    new_post.id = generate_id();
    diesel::insert_into(posts)
        .values(&new_post)
        .get_result(conn)
}

pub fn get_post_by_id(conn: &mut PgConnection, post_id: i64) -> QueryResult<Post> {
    posts.find(post_id).get_result(conn)
}

pub fn get_all_posts(conn: &mut PgConnection) -> QueryResult<Vec<Post>> {
    posts.load(conn)
}

pub fn delete_post(conn: &mut PgConnection, post_id: i64) -> QueryResult<usize> {
    diesel::delete(posts.find(post_id)).execute(conn)
}
