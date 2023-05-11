import { db } from "../database/db.js";
import { states } from "./queries.js";

export const GetAllStates = async (req, res) => {
  try {
    const results = await db.query(states);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error retrieving states" });
  }
};
