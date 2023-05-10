// create all queries for the realtor controller
export const realtors = "SELECT * FROM realtors";
export const realtorById = `SELECT * FROM realtors WHERE id = $1`;
export const realtorsByState = `
  SELECT realtors.first_name, realtors.last_name, realtors.phone, states.short_name
  FROM realtors JOIN states ON states.id = realtors.states_id
  WHERE short_name = $1
  `;

// create all queries for the properties
// get requests
export const properties = "SELECT * FROM properties";
export const propertiesById = "SELECT * FROM properties WHERE id = $1";
export const propertiesByRealtor = `
SELECT * FROM properties
JOIN realtors ON realtors.id = properties.realtors_id
WHERE realtors_id = $1`;
export const propertiesByStates = `
SELECT * FROM properties
JOIN states ON states.id = properties.states_id
WHERE short_name = $1`;
//post request
export const newProperty = `
INSERT INTO properties(
  realtors_id, states_id, street_address, city, zipcode, price, bed, bath, sqft, date_posted
  )
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
RETURNING *`;
// patch request
export const updateProperty = `UPDATE properties
SET realtors_id = COALESCE( $1, realtors_id ), states_id = COALESCE( $2, states_id ),
street_address = COALESCE( $3, street_address ), city = COALESCE( $4, city ),
zipcode = COALESCE( $5, zipcode ), price = COALESCE( $6, price ), bed = COALESCE($7, bed),
bath = COALESCE( $8, bath ), sqft = COALESCE( $9, sqft ) WHERE id =$10
RETURNING *
`;

// state queries
export const states = "SELECT * FROM states";
