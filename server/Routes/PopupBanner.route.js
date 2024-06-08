import express from 'express';
import { GetPopupBannerData, PostPopupBannerData,readSpecificUserData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData } from '../Controllers/PopupBanner.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();

router.use(verifyToken)
router.get('/',GetPopupBannerData);
router.post('/',PostPopupBannerData);
//Read Specific user all Data:
router.get("/specificAll/:userName", readSpecificUserData);
//Read Specific user all Data:
router.get("/specific/:id", getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:id", updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:userName", deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", deleteSpecificUserData);

export default router;
