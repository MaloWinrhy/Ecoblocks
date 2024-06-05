table! {
    use diesel::sql_types::*;
    use diesel::sql_types::Uuid as DieselUuid;

    users (id) {
        id -> DieselUuid,
        username -> Nullable<Varchar>,
        passphrase -> Text,
        role_id -> Int4,
        created_at -> Timestamp,
    }
}
