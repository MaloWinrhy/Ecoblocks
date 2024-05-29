# Use the official Rust image as a base
FROM rust:latest

# Set the working directory inside the container
WORKDIR /usr/src/ecoblock-api

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Copy the source code
COPY src ./src

# Build the application
RUN cargo install --path .

# Expose the port the application will run on
EXPOSE 8000

# Run the application
CMD ["ecoblock-api"]

