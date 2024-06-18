use diesel::prelude::*;
use crate::routes::posts::models::{Post, NewPost};
use crate::schema::posts::dsl::*;
use diesel::pg::PgConnection;

pub fn create_post(conn: &mut PgConnection, new_post: NewPost) -> QueryResult<Post> {
    diesel::insert_into(posts)
        .values(&new_post)
        .get_result(conn)
}

pub fn get_post_by_id(conn: &mut PgConnection, post_id: i32) -> QueryResult<Post> {
    posts.find(post_id).get_result(conn)
}

pub fn get_all_posts(conn: &mut PgConnection) -> QueryResult<Vec<Post>> {
    posts.load(conn)
}

pub fn delete_post(conn: &mut PgConnection, post_id: i32) -> QueryResult<usize> {
    diesel::delete(posts.find(post_id)).execute(conn)
}
