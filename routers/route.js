import { Router } from "express";
import {
  GetRealtorById,
  getAllRealtors,
  getAllRealtorsByState,
} from "../controllers/realtorController.js";
import {
  addProperty,
  getAllProperties,
  getPropertiesById,
  getPropertiesByRealtor,
  getPropertiesBystates,
  updateProperties,
} from "../controllers/propController.js";
import { GetAllStates } from "../controllers/stateController.js";

const router = Router();

// property routes
router
  .get("/properties", getAllProperties)
  .get("/property/:id", getPropertiesById)
  .get("/properties/:states", getPropertiesBystates)
  .get("/properties/realtor/:id", getPropertiesByRealtor);

router.post("/properties", addProperty);

router.patch("/properties/:id", updateProperties);
// realtor routes
router
  .get("/realtors", getAllRealtors)
  .get("/realtors/:states", getAllRealtorsByState)
  .get("/realtor/:id", GetRealtorById)
  .get("/states", GetAllStates);

// create all CRUD routes
// export router

export default router;
