import express from 'express';
import { GetGalleryData, PostGalleryData,readSpecificUserAllData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData } from '../Controllers/Gallery.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.get('/',verifyToken,GetGalleryData);
router.post('/',verifyToken,PostGalleryData);
 //Read Specific user all Data:
 router.get("/specificAll/:userName", verifyToken, readSpecificUserAllData);
 //Read Specific user all Data:
 router.get("/specific/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:userName", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;
