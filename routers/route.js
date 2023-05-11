import { Router } from "express";
import {
  getRealtorById,
  getAllRealtors,
  getAllRealtorsByState,
  addRealtors,
  updateRealtors,
  deleteRealtors,
} from "../controllers/realtorController.js";
import {
  addProperty,
  deleteProperties,
  getAllProperties,
  getPropertiesById,
  getPropertiesByRealtor,
  getPropertiesBystates,
  updateProperties,
} from "../controllers/propController.js";
import { getAllStates } from "../controllers/stateController.js";
import { deleteRealtor } from "../controllers/queries.js";

const router = Router();

// property routes
router
  .get("/properties", getAllProperties)
  .get("/property/:id", getPropertiesById)
  .get("/properties/:states", getPropertiesBystates)
  .get("/properties/realtor/:id", getPropertiesByRealtor);

router.post("/properties", addProperty);

router.patch("/properties/:id", updateProperties);

router.delete("/properties/:id", deleteProperties);
// realtor routes
router
  .get("/realtors", getAllRealtors)
  .get("/realtors/:states", getAllRealtorsByState)
  .get("/realtor/:id", getRealtorById)
  .get("/states", getAllStates);

router.post("/realtors", addRealtors);

router.patch("/realtors/:id", updateRealtors);

router.delete("/realtors/:id", deleteRealtors);
// create all CRUD routes
// export router

export default router;
