import express from 'express';
import { GetTestimonialData, PostTestimonialData } from '../Controllers/Testimonial.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.get('/',verifyToken,GetTestimonialData);
router.post('/',verifyToken,PostTestimonialData);


export default router;
