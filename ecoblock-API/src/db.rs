use diesel::prelude::*;
use diesel::PgConnection;
use std::thread;
use std::time::Duration;

pub fn establish_connection(database_url: &str) -> Result<PgConnection, diesel::ConnectionError> {
    let max_retries = 5;
    for _ in 0..max_retries {
        match PgConnection::establish(database_url) {
            Ok(connection) => return Ok(connection),
            Err(err) => {
                eprintln!("Failed to connect to the database: {}. Retrying...", err);
                thread::sleep(Duration::from_secs(5));
            }
        }
    }

    Err(diesel::ConnectionError::BadConnection(format!(
        "Failed to connect to the database after {} attempts",
        max_retries
    )))
}
