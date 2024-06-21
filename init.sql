-- Ensure the 'ecoblocks_user' role exists
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ecoblocks_user') THEN
        CREATE ROLE ecoblocks_user WITH LOGIN PASSWORD 'ecoblocks_password';
    END IF;
END
$$;

-- Create 'ecoblocks_db' database if it does not exist
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'ecoblocks_db') THEN
        CREATE DATABASE ecoblocks_db WITH OWNER ecoblocks_user;
    END IF;
END
$$;

-- Connect to 'ecoblocks_db' and create a table
\c ecoblocks_db

-- Create a sample table
CREATE TABLE IF NOT EXISTS sample_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
