use diesel::{Queryable, Insertable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::NaiveDateTime;
use crate::schema::users;

#[derive(Queryable, Serialize, Deserialize)]
pub struct User {
    #[serde(with = "uuid_serde")]
    pub id: Uuid,
    pub username: Option<String>,
    pub passphrase: String,
    pub role_id: i32,
    #[serde(with = "chrono_serde")]
    pub created_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser<'a> {
    pub username: Option<&'a str>,
    pub passphrase: &'a str,
    pub role_id: i32,
}

// Modules de sérialisation personnalisés
mod uuid_serde {
    use serde::{self, Deserialize as _, Deserializer, Serializer};
    use uuid::Uuid;

    pub fn serialize<S>(uuid: &Uuid, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&uuid.to_string())
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<Uuid, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        Uuid::parse_str(&s).map_err(serde::de::Error::custom)
    }
}

mod chrono_serde {
    use serde::{self, Serializer, Deserializer};
    use chrono::NaiveDateTime;
    use chrono::format::ParseError;

    const FORMAT: &'static str = "%Y-%m-%d %H:%M:%S";

    pub fn serialize<S>(date: &NaiveDateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = date.format(FORMAT).to_string();
        serializer.serialize_str(&s)
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = <String as serde::Deserialize>::deserialize(deserializer)?;
        NaiveDateTime::parse_from_str(&s, FORMAT).map_err(serde::de::Error::custom)
    }
}
