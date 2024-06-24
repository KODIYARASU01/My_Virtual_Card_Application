import express from 'express';

let router=express.Router();
import Vcard_URL from '../Models/Vcard_URL.model.js';
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
import PrivacyPolicyModel from '../Models/PrivacyPolicy.model.js';
import TermConditionModel from '../Models/Terms&Condition.model.js';
import { verifyToken } from '../Middleware/verifyToken.js';

router.delete('/all_Data_Delete_API/:URL_Alies', async(req,res)=>{
    try {
   
        let URL_Alies= req.params.URL_Alies;
        let result = {};

        let getURLData = await Vcard_URL.findOneAndDelete({ URL_Alies:URL_Alies });
    
        if (!getURLData) {
          result["Vcard_URL"] = getURLData;
        } else {
          result["Vcard_URL"] = getURLData;
        };

        let getSpecificData = await BasicDetails.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
    
        if (!getSpecificData) {
          result["BasicDetails"] = getSpecificData;
        } else {
          result["BasicDetails"] = getSpecificData;
        };

    
        // let ContactDetails_data = await ContactDetails.find({ user: userid });
    
        // if (!ContactDetails_data) {
        //   res.status(400).json({ message: "Specific Data Not Found" });
        // } else {
        //   result["ContactDetails"] = ContactDetails_data;
        // }
    
        let ServiceDetails_data = await ServiceData.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
    
        if (!ServiceDetails_data) {
          result["ServiceData"] = ServiceDetails_data;
        } else {
          result["ServiceData"] = ServiceDetails_data;
        };

    
        let ProductDetails_data = await ProductModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
    
        if (!ProductDetails_data) {
          result["ProductModel"] = ProductDetails_data;
        } else {
          result["ProductModel"] = ProductDetails_data;
        };
    
        let GalleryDetails_data = await GalleryModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
    
        if (!GalleryDetails_data) {
          result["GalleryModel"] = GalleryDetails_data;
        } else {
          result["GalleryModel"] = GalleryDetails_data;
        };
    
        // let QRCodeDetails_data = await QRCodeDetails.find({ user: userid });
    
        // if (!QRCodeDetails_data) {
        //   res.status(400).json({ message: "Product Data Not Found" });
        // } else {
        //   result["QRCodeDetails"] = QRCodeDetails_data;
        // }
    
        let SocialMediaDetails_data = await SocialMediaModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
    
        if (!SocialMediaDetails_data) {
          result["SocialMediaModel"] = SocialMediaDetails_data;
        } else {
          result["SocialMediaModel"] = SocialMediaDetails_data;
        };
    
        let TestimonialDetails_data = await TestimonialModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
        if (!TestimonialDetails_data) {
          result["TestimonialModel"] = TestimonialDetails_data;
        } else {
          result["TestimonialModel"] = TestimonialDetails_data;
        };


        let PopUpBannerDetails_data = await PopupBannerModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
          if (!PopUpBannerDetails_data) {
            result["PopupBannerModel"] = PopUpBannerDetails_data;
          } else {
            result["PopupBannerModel"] = PopUpBannerDetails_data;
          };


          // let PlanDetails_data = await currentPlan.deleteMany({
          //   URL_Alies: URL_Alies
          // });
      
          // if (!PlanDetails_data) {
          //   res.status(400).json({ message: "Plan Data Not Found" });
          // } else {
          //   result["currentPlan"] = PlanDetails_data;
          // }


          let PrivacyPolicy_data = await PrivacyPolicyModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
      
          if (!PrivacyPolicy_data) {
            result["PrivacyPolicyModel"] = PrivacyPolicy_data;
          } else {
            result["PrivacyPolicyModel"] = PrivacyPolicy_data;
          };


          let TermsCondition_data = await TermConditionModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
      
          if (!TermsCondition_data) {
            res.status(400).json({ message: "Terms&Condition Data Not Found" });
          } else {
            result["TermConditionModel"] = TermsCondition_data;
          };
          


          let VCardTemplateDetails_data = await Current_VCardTemplate.findOneAndDelete({ URL_Alies: req.params.URL_Alies });
      
          if (!VCardTemplateDetails_data) {
            result["Current_VCardTemplate"] = VCardTemplateDetails_data;
          } else {
            result["Current_VCardTemplate"] = VCardTemplateDetails_data;
          };

        res.status(200).json({ data:result });
    
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})


export default router;
