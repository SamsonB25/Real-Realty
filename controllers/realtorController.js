import { db } from "../database/db.js";

import {
  deleteRealtor,
  newRealtor,
  propertiesById,
  realtorById,
  realtors,
  realtorsByState,
  updateFK,
  updateRealtor,
} from "./queries.js";

export const getAllRealtors = async (req, res) => {
  try {
    const results = await db.query(realtors);
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
    if (results.rowCount === 0 || Number(states) === NaN) {
      res.status(404).send("oops, Something went wrong.");
      return;
    }
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error retrieving realtors." });
  }
};

export const getRealtorById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const results = await db.query(realtorById, [id]);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error retrieving realtor." });
  }
};

export const addRealtors = async (req, res) => {
  try {
    const {
      users_id,
      states_id,
      first_name,
      last_name,
      rating,
      properties_sold,
      phone,
      email,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !rating ||
      !properties_sold ||
      !phone ||
      !email
    ) {
      res.status(404).json("Fill All Required Fields");
      return;
    }
    const results = await db.query(newRealtor, [
      users_id,
      states_id,
      first_name,
      last_name,
      rating,
      properties_sold,
      phone,
      email,
    ]);
    res.status(201).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error Creating Realtor." });
  }
};

export const updateRealtors = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const {
      users_id,
      states_id,
      first_name,
      last_name,
      rating,
      properties_sold,
      phone,
      email,
    } = req.body;
    const results = await db.query(updateRealtor, [
      users_id,
      states_id,
      first_name,
      last_name,
      rating,
      properties_sold,
      phone,
      email,
      id,
    ]);
    res.status(202).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error Updating Realtor." });
  }
};

export const deleteRealtors = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const setFKNull = await db.query(updateFK, [id]);
    console.log(setFKNull);
    const results = await db.query(deleteRealtor, [id]);
    res.status(200).json(setFKNull.rows[0]).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error Deleting Realtor." });
  }
};
