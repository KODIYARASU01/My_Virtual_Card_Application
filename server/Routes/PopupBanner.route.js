import express from 'express';
import { GetPopupBannerData, PostPopupBannerData } from '../Controllers/PopupBanner.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.get('/',verifyToken,GetPopupBannerData);
router.post('/',verifyToken,PostPopupBannerData);


export default router;
