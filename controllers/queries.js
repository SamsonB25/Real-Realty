// create all queries for users
export const allUsers = `SELECT * FROM users`;
export const user = `SELECT * FROM users WHERE username = $1 AND password = $2 `;
export const createUsers = `INSERT INTO users(username, password, phone, email)
VALUES($1, $2, $3, $4)`;
export const usernameCheck = `SELECT username FROM users WHERE username = $1`;
export const like_property = `UPDATE users SET liked_properties = $1 WHERE username = $2`;
export const usersLogin = `SELECT password FROM users WHERE username = $1`;
export const usersLikedProperties = `
SELECT * FROM users
JOIN properties
ON (SELECT liked_properties ->> 'property_id'::int AS property_id) = properties.id`;
// create all queries for the realtor controller
export const realtors = "SELECT * FROM realtors";
export const realtorById = `SELECT * FROM realtors WHERE id = $1`;
export const realtorsByState = `
  SELECT realtors.first_name, realtors.last_name, realtors.phone, states.state_name_short
  FROM realtors JOIN states ON states.id = realtors.states_id
  WHERE state_name_short = $1
  `;
export const newRealtor = `INSERT INTO realtors( 
  users_id, states_id, first_name, last_name, rating, properties_sold, phone, email)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
export const updateRealtor = `UPDATE realtors
  SET states_id = COALESCE( $1, states_id ), users_id = COALESCE( $2, users_id ),
  first_name = COALESCE( $3, first_name ), last_name = COALESCE( $4, last_name ),
  rating = COALESCE( $5, rating ), properties_sold = COALESCE( $6, properties_sold ), phone = COALESCE($7, phone),
  email = COALESCE( $8, email ) WHERE id =$9 RETURNING *
  `;
export const deleteRealtor = `DELETE FROM realtors WHERE id = $1 RETURNING *`;

// create all queries for the properties
// get requests
export const properties = "SELECT * FROM properties";
export const propertiesWithRealtors =
  "SELECT * FROM realtors JOIN properties ON realtors.id = properties.realtors_id ORDER BY date_posted";
export const propertiesById = "SELECT * FROM properties WHERE id = $1";
export const deleteProperty = `DELETE FROM properties WHERE street_address = $1 AND city = $2 AND states_id = $3 RETURNING *`;
export const propertiesByRealtor = `
SELECT * FROM properties
JOIN realtors ON realtors.id = properties.realtors_id
WHERE realtors_id = $1`;
export const propertiesByStates = `
SELECT * FROM properties
JOIN states ON states.id = properties.states_id
JOIN realtors ON states.id = realtors.states_id
WHERE states.id = $1`;
//post request
export const newProperty = `
INSERT INTO properties(
  realtors_id, states_id, street_address, city, zipcode, price, bed, bath, sqft, images, date_posted
  )
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *`;
// patch request
export const updateProperty = `UPDATE properties
SET realtors_id = COALESCE( $1, realtors_id ), states_id = COALESCE( $2, states_id ),
street_address = COALESCE( $3, street_address ), city = COALESCE( $4, city ),
zipcode = COALESCE( $5, zipcode ), price = COALESCE( $6, price ), bed = COALESCE($7, bed),
bath = COALESCE( $8, bath ), sqft = COALESCE( $9, sqft ), images = COALESCE($10, images)  WHERE states_id = $2 AND street_address = $3 AND city = $4  
RETURNING *
`;

// state queries
export const states = "SELECT * FROM states";
