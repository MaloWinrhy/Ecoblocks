FROM rust:latest

WORKDIR /usr/src/ecoblock-api

COPY Cargo.toml Cargo.lock ./

RUN apt-get update && apt-get install -y libpq-dev
RUN cargo install diesel_cli --no-default-features --features postgres

COPY . .

RUN cargo build --release

CMD ["./target/release/ecoblock-api"]
