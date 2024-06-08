import express from 'express';
import { GetServiceData, PostServiceData,  
    getSpecificUserAllData,
    getSpecificIdData,
    updateSpecificUserData,
    deleteSpecificUserAllData,
    deleteSpecificUserData } from '../Controllers/Service.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.get('/',verifyToken,GetServiceData);
router.post('/',verifyToken,PostServiceData);
 //Read Specific user all Data:
 router.get("/specificAll/:userName", verifyToken, getSpecificUserAllData);
 //Read Specific ID Data:
 router.get("/specific/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:userName", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);


export default router;