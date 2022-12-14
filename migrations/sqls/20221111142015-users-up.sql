CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username  VARCHAR(255) NOT NULL,
    password_digest  VARCHAR(255) NOT NULL
   
);