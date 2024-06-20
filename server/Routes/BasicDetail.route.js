import express from "express";
import {
  getBasicAllData,
  postBasicAllData,
  readSpecificUserAllData,
  readSpecificIdUserData,
  updateSpecificUserData,

  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/BasicDetail.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import upload from "../Multer/config.js";

let router = express.Router();

//Get all basicDetails:


router.get("/", verifyToken, getBasicAllData);
router.post("/",verifyToken, postBasicAllData);
//Read Specific user all Data:
router.get("/specificAll/:userName", verifyToken, readSpecificUserAllData);
//Read Specific user all Data:
router.get("/specific/:id", verifyToken, readSpecificIdUserData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:userName", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;
