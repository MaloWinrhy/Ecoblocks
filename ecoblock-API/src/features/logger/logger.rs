use log::LevelFilter;
use env_logger::{Builder, Target};
use std::env;

pub fn init_routes() {
    let mut builder = Builder::new();

    builder
        .target(Target::Stdout)
        .filter_level(LevelFilter::Info);

    if let Ok(log_level) = env::var("RUST_LOG") {
        builder.parse_filters(&log_level);
    }

    builder.init();
}
