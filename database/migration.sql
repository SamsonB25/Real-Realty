DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS realitors;

CREATE TABLE states(
    id SERIAL PRIMARY KEY,
    long_name TEXT,
    short_name CHAR(2)
    );

CREATE TABLE realitors (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  rating INT,
  properties_sold INT,
  phone INT,
  email VARCHAR(255),
  state_id INTEGER REFERENCES states(id)
);


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone INT,
  email VARCHAR(255)
);

CREATE TABLE properties(
  id SERIAL PRIMARY KEY,
  street_address VARCHAR,
  city TEXT,
  zipcode INT,
  price MONEY,
  bed INT,
  bath INT,
  sqft INT,
  realitors_id INTEGER REFERENCES realitors(id),
  users_id INTEGER REFERENCES users(id)
);