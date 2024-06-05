import express from "express";
import {
  GetProductData,
  PostProductData,
  readSpecificUserData,
  updateSpecificUserData,
  getSpecificIdData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/Product.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
let router = express.Router();

router.get("/", verifyToken, GetProductData);
router.post("/", verifyToken, PostProductData);
//Read Specific user all Data:
router.get("/specific/:id", verifyToken, readSpecificUserData);
//Read Specific ID Data:
router.get("/specificId/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:id", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;
