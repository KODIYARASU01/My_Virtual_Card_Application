import express from 'express';
import { RegisterUser,ReadRegisteredUserAllData,ReadRegisteredUserSpecificData,DeleteRegisteredUserSpecificData,UpdateRegisteredUserSpecificData } from '../Controllers/Register.controller.js';
// import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();

//Register User:
router.post('/register',RegisterUser);
//Get all Registered User Data
router.get('/register',ReadRegisteredUserAllData)
//Get Specific user Data
router.get('/register/:id',ReadRegisteredUserSpecificData);
//Update Specific User Data:
router.put('/register/:id',UpdateRegisteredUserSpecificData);
//Delete Specific User Data:
router.delete('/register/:id',DeleteRegisteredUserSpecificData);


export default router;