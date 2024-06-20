import express from "express";
import {
  GetProductData,
  PostProductData,
  readSpecificUserAllData,
  updateSpecificUserData,
  getSpecificIdData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/Product.controller.js";

let router = express.Router();
import { verifyToken } from "../Middleware/verifyToken.js";
router.get("/", verifyToken, GetProductData);
router.post("/", verifyToken, PostProductData);
//Read Specific user all Data:
router.get("/specificAll/:userName", verifyToken, readSpecificUserAllData);
//Read Specific ID Data:
router.get("/specific/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:userName", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;
