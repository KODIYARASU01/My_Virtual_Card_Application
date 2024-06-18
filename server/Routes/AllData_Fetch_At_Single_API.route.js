import express from 'express';

let router=express.Router();

import BasicDetails from '../Models/BasicDetail.model.js';
import GalleryModel from '../Models/Gallery.model.js';
import TotalLikes from '../Models/Likes.model.js';
import currentPlan from '../Models/Plan.model.js';
import PopupBannerModel from '../Models/PopupBanner.model.js';
import ProductModel from '../Models/Products.model.js';
import ServiceData from '../Models/Services.model.js';
import SocialMediaModel from '../Models/SocialMedia.model.js';
import TestimonialModel from '../Models/Testimonial.model.js';
import Current_VCardTemplate from '../Models/VCardTemplate.model.js';

router.get('/allDataAPI',async(req,res)=>{
    try {
   
        let userName = req.query.userName;
        let result = {};
    
        let getSpecificData = await BasicDetails.find({ user: userName });
    
        if (!getSpecificData) {
          res.status(400).json({ message: "Specific Data Not Found" });
        } else {
          result["BasicDetails"] = getSpecificData;
        }
    
        // let ContactDetails_data = await ContactDetails.find({ user: userid });
    
        // if (!ContactDetails_data) {
        //   res.status(400).json({ message: "Specific Data Not Found" });
        // } else {
        //   result["ContactDetails"] = ContactDetails_data;
        // }
    
        let ServiceDetails_data = await ServiceData.find({ user: userName });
    
        if (!ServiceDetails_data) {
          res.status(400).json({ message: "Service Data Not Found" });
        } else {
          result["ServiceData"] = ServiceDetails_data;
        }
    
        let ProductDetails_data = await ProductModel.find({ user: userName });
    
        if (!ProductDetails_data) {
          res.status(400).json({ message: "Product Data Not Found" });
        } else {
          result["ProductModel"] = ProductDetails_data;
        }
    
        let GalleryDetails_data = await GalleryModel.find({ user: userName });
    
        if (!GalleryDetails_data) {
          res.status(400).json({ message: "Gallery Data Not Found" });
        } else {
          result["GalleryModel"] = GalleryDetails_data;
        }
    
        // let QRCodeDetails_data = await QRCodeDetails.find({ user: userid });
    
        // if (!QRCodeDetails_data) {
        //   res.status(400).json({ message: "Product Data Not Found" });
        // } else {
        //   result["QRCodeDetails"] = QRCodeDetails_data;
        // }
    
        let SocialMediaDetails_data = await SocialMediaModel.find({ user: userName });
    
        if (!SocialMediaDetails_data) {
          res.status(400).json({ message: "SocialMedia Data Not Found" });
        } else {
          result["SocialMediaModel"] = SocialMediaDetails_data;
        }
    
        let TestimonialDetails_data = await TestimonialModel.find({
          user: userName,
        });
    
        if (!TestimonialDetails_data) {
          res.status(400).json({ message: "Testimonial Data Not Found" });
        } else {
          result["TestimonialModel"] = TestimonialDetails_data;
        }
        let PopUpBannerDetails_data = await PopupBannerModel.find({
            user: userName,
          });
      
          if (!PopUpBannerDetails_data) {
            res.status(400).json({ message: "PopUpBanner Data Not Found" });
          } else {
            result["PopupBannerModel"] = PopUpBannerDetails_data;
          }
          let PlanDetails_data = await currentPlan.find({
            user: userName,
          });
      
          if (!PlanDetails_data) {
            res.status(400).json({ message: "Plan Data Not Found" });
          } else {
            result["currentPlan"] = PlanDetails_data;
          }
          let VCardTemplateDetails_data = await Current_VCardTemplate.find({
            user: userName,
          });
      
          if (!VCardTemplateDetails_data) {
            res.status(400).json({ message: "VCard_Template Data Not Found" });
          } else {
            result["Current_VCardTemplate"] = VCardTemplateDetails_data;
          }
        res.status(200).json({ data:result });
    
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})


export default router;
