DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS states CASCADE;
DROP TABLE IF EXISTS realtors CASCADE;
DROP TABLE IF EXISTS properties CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE states(
    id SERIAL PRIMARY KEY,
    users_id INT REFERENCES users(id),
    -- realtors_id INT REFERENCES realtors(id),
    long_name TEXT,
    short_name CHAR(2)
    );

CREATE TABLE realtors (
  id SERIAL PRIMARY KEY,
  states_id INTEGER REFERENCES states(id),
  users_id INTEGER REFERENCES users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  rating DECIMAL NOT NULL,
  properties_sold INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL
);



CREATE TABLE properties(
  id SERIAL PRIMARY KEY,
  realtors_id INTEGER REFERENCES realtors(id),
  states_id INTEGER REFERENCES states(id),
  street_address VARCHAR NOT NULL,
  city TEXT NOT NULL,
  zipcode INT NOT NULL,
  price MONEY NOT NULL,
  bed INT NOT NULL,
  bath INT NOT NULL,
  sqft INT NOT NULL,
  date_posted TIMESTAMP NOT NULL
);