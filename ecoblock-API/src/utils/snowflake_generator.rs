extern crate snowflake;

use snowflake::SnowflakeIdGenerator;
use std::sync::Mutex;
use lazy_static::lazy_static;

lazy_static! {
    pub static ref SNOWFLAKE: Mutex<SnowflakeIdGenerator> = Mutex::new(SnowflakeIdGenerator::new(1, 1));
}

pub fn generate_id() -> i64 {
    let mut generator = SNOWFLAKE.lock().unwrap();
    generator.generate()
}
