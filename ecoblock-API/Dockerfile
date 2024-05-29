# Rust Dockerfile for ecoblock-API
FROM rust:latest

WORKDIR /usr/src/ecoblock-API
COPY . .

RUN cargo install --path .

CMD ["ecoblock-API"]
