CREATE DATABASE astro_typescript_first_app;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);