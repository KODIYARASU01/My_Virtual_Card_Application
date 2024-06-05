import express from "express";
import {
  getBasicAllData,
  postBasicAllData,
  readSpecificUserData,
  updateSpecificUserData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/BasicDetail.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

let router = express.Router();

//Get all basicDetails:
router.get("/", verifyToken, getBasicAllData);

router.post("/", verifyToken, postBasicAllData);

//Read Specific user all Data:
router.get("/specific/:id", verifyToken, readSpecificUserData);

//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:id", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;