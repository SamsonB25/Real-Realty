import { db } from "../database/db.js";
import { realtorById, realtors, realtorsByState } from "./queries.js";

export const getAllRealtors = async (req, res) => {
  try {
    const results = await db.query(realtors);
    // change back to index 0 when we figure out the response issue.
    // res body only returning 1 obj when calling for index 0
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error retrieving realtors." });
  }
};

export const getAllRealtorsByState = async (req, res) => {
  const states = req.params.states;
  try {
    const results = await db.query(realtorsByState, [states.toUpperCase()]);
    if (results.rowCount === 0) {
      console.log(typeof states);
      res.status(404).send("oops, Something went wrong.");
      return;
    }
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error retrieving realtors." });
  }
};

export const GetRealtorById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const results = await db.query(realtorById, [id]);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error retrieving realtor." });
  }
};

// export const addRealtors = async (req, res)=>{
//   const id = Number(req.params.id);
//   try{
//     const results = await db.query()
//   }

// }
