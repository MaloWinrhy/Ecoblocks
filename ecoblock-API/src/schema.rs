diesel::table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        email -> Varchar,
        password_hash -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        content -> Text,
        image -> Nullable<Varchar>,
        tags -> Array<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
