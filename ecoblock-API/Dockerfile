# Use the official Rust image as a base image
FROM rust:latest

# Set the working directory
WORKDIR /usr/src/ecoblock-api

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Install Diesel CLI
RUN cargo install diesel_cli --no-default-features --features postgres

# Copy the source code
COPY . .

# Build the project
RUN cargo build --release

# Set the startup command
CMD ["./target/release/ecoblock-api"]
