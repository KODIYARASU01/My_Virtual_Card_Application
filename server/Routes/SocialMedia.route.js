import express from 'express';
import { GetSocialMediaData, PostSocialMediaData  , getSpecificUserAllData,
    getSpecificIdData,
    updateSpecificUserData,
    updateSpecificUserData_id,
    deleteSpecificUserAllData,
    deleteSpecificUserData } from '../Controllers/SocialMedia.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.get('/',verifyToken,GetSocialMediaData);
router.post('/',verifyToken,PostSocialMediaData);
 //Read Specific user all Data:
 router.get("/specificAll/:userName", verifyToken, getSpecificUserAllData);
 //Read Specific ID Data:
 router.get("/specific/:id", verifyToken, getSpecificIdData);
 //Update Specific user :
router.put("/update_by_userName/:userName", verifyToken, updateSpecificUserData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData_id);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:userName", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;
