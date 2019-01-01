-- main database build sql, no hardcoded entries
BEGIN;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS talks cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(200) NOT NULL
);


CREATE TABLE talks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users (id),
  subject VARCHAR(100) NOT NULL,
  datetime TIMESTAMP NOT NULL, -- have to combine date and tiem picker on front and back end, and put into correct format
  html BOOLEAN NOT NULL,
  css BOOLEAN NOT NULL,
  js BOOLEAN NOT NULL,
  sql BOOLEAN NOT NULL,
  node BOOLEAN NOT NULL
);

COMMIT;