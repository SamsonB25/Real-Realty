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
import {
  createUser,
  getAllUsers,
  getUser,
  tokenCheck,
  userLogin,
  usersLikedProperties,
} from "../controllers/usersController.js";

const router = Router();
// user routes
router
  .get("/user", getAllUsers)
  .get("/user/:username/:password", getUser)
  .get("/user/liked_properties", usersLikedProperties);
router
  .post("/user/signup", createUser)
  .post("/user/login/:username/:password", userLogin)
  .post("/token", tokenCheck);
// property routes
router
  .get("/home", getAllPropertiesWithRealtors)
  .get("/properties", getAllProperties)
  .get("/property/:id", getPropertiesById)
  .get("/properties/:states", getPropertiesBystates)
  .get("/properties/realtor/:id", getPropertiesByRealtor);

router.post("/properties", addProperty);

router.patch("/properties/:street_address/:city/:states_id", updateProperties);

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
