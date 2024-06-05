import express from 'express';
import { GetSocialMediaData, PostSocialMediaData } from '../Controllers/SocialMedia.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.get('/',verifyToken,GetSocialMediaData);
router.post('/',verifyToken,PostSocialMediaData);


export default router;
