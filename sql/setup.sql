-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  login VARCHAR NOT NULL,
  avatar VARCHAR NOT NULL
);


CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);


CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  detail VARCHAR(255) NOT NULL,
  user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES github_users(id));


INSERT INTO
  github_users (login, avatar)
VALUES
  ('Velcro', 'https://placebear.com/300/300'),
  ('Billy Shears', 'https://placebear.com/300/300');

INSERT INTO
  posts (detail, user_id)
VALUES
  ('I can haz code?', 1),
  ('What would you think if I coded a tune?', 2),
  ('I ate a slug', 1);
