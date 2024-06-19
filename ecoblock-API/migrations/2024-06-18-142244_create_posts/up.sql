CREATE TABLE posts (
    id BIGINT PRIMARY KEY,
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR,
    tags TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
