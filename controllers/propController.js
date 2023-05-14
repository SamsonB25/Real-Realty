import { db } from "../database/db.js";
import {
  deleteProperty,
  newProperty,
  properties,
  propertiesById,
  propertiesByRealtor,
  propertiesByStates,
  propertiesWithRealtors,
  updateProperty,
} from "./queries.js";

export const getAllProperties = async (req, res) => {
  try {
    const results = await db.query(properties);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving properties." });
  }
};

export const getAllPropertiesWithRealtors = async (req, res) => {
  try {
    const results = await db.query(propertiesWithRealtors);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving properties." });
  }
};

export const getPropertiesById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id < 0) {
      res.status(404).json("Property Not Found");
      return;
    }
    const results = await db.query(propertiesById, [id]);
    console.log(results.rowCount);
    if (results.rowCount === 0) {
      res.status(404).json("Property Not Found");
      return;
    }
    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const getPropertiesBystates = async (req, res) => {
  const state = req.params.states;
  if (state.length !== 2) {
    res.status(405).json("Use State's Two Letter Abbriviation");
    return;
  }
  try {
    const results = await db.query(propertiesByStates, [state.toUpperCase()]);
    if (results.rowCount === 0) {
      res.status(404).json("No Properties In This State");
      return;
    }
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error retrieving properties." });
  }
};

export const getPropertiesByRealtor = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const results = await db.query(propertiesByRealtor, [id]);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error retrieving properties." });
  }
};

export const addProperty = async (req, res) => {
  try {
    const {
      realtors_id,
      states_id,
      street_address,
      city,
      zipcode,
      price,
      bed,
      bath,
      sqft,
    } = req.body;
    if (
      !street_address ||
      !city ||
      !zipcode ||
      !price ||
      !bed ||
      !bath ||
      !sqft
    ) {
      res.status(406).json({ Error: "Ensure all required fields are filled" });
      return;
    }
    const date_posted = new Date().toISOString();
    const results = await db.query(newProperty, [
      realtors_id,
      states_id,
      street_address,
      city,
      zipcode,
      price,
      bed,
      bath,
      sqft,
      date_posted,
    ]);
    res.status(201).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error Creating Listing" });
  }
};

export const updateProperties = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const {
      realtors_id,
      states_id,
      street_address,
      city,
      zipcode,
      price,
      bed,
      bath,
      sqft,
    } = req.body;
    const results = await db.query(updateProperty, [
      realtors_id,
      states_id,
      street_address,
      city,
      zipcode,
      price,
      bed,
      bath,
      sqft,
      id,
    ]);
    res.status(202).json(results.rows[0]);
    //error handling
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error updating property." });
  }
};

export const deleteProperties = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const results = await db.query(deleteProperty, [id]);
    res.status(200).json(results.rows[0]);
  } catch (err) {}
};
