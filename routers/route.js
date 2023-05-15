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
  getAllPropertiesWithRealtors,
  getPropertiesById,
  getPropertiesByRealtor,
  getPropertiesBystates,
  updateProperties,
} from "../controllers/propController.js";
import { getAllStates } from "../controllers/stateController.js";

const router = Router();

// property routes
router
  .get("/home", getAllPropertiesWithRealtors)
  .get("/properties", getAllProperties)
  .get("/property/:id", getPropertiesById)
  .get("/properties/:states", getPropertiesBystates)
  .get("/properties/realtor/:id", getPropertiesByRealtor);

router.post("/properties", addProperty);

router.patch("/properties/:id", updateProperties);

router.delete("/properties/:street_address/:city/:states_id", deleteProperties);
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
