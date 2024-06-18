import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Import necessary functions from the url and path modules
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from "dotenv";
import helmet from 'helmet';
import multer from "multer";
import mongoose from "mongoose";

//All api route importing
import RegisterRoute from './Routes/Register.route.js';
import LoginRoute from './Routes/Login.route.js';
import BasicDetailRoute from './Routes/BasicDetail.route.js';
import TemplateRoute from './Routes/VCardTemplate.route.js';
import ServiceDetailRoute from './Routes/Services.route.js';
import ProductDetailRoute from './Routes/Product.route.js';
import GalleryDetailRoute from './Routes/Gallery.route.js';
import TestimonialDetailRoute from './Routes/Testimonial.route.js';
import SocialMediaDetailRoute from './Routes/SocialMedia.route.js';
import PopupBannerDetailRoute from './Routes/PopupBanner.route.js'
import PlanDetailRoute from './Routes/Plan.route.js';
import AllDataRoute from './Routes/AllData_Fetch_At_Single_API.route.js'
//App initialized
let app = express();
// Configurations:
// Convert the URL of the current module to a filename
const __filename = fileURLToPath(import.meta.url); 
// Extract the directory name from the filename
const __dirname = path.dirname(__filename);
dotenv.config();
//Port initializing:
let PORT = process.env.PORT || 3000;
//Cors Policy connect frontend and backend with same port:
app.use(cors());
//This will help you to send data to server in json formate:
app.use(express.json({limit:'30mb'}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
//This will help you to allow file upload size limit
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname,'public')));



 
app.get("/", (req, res) => {
  console.log(req.path);
  res.send("Hello");
});

// Api All Routes:
app.use('/auth',RegisterRoute);
app.use('/currentplan',PlanDetailRoute);
app.use('/auth',LoginRoute);
app.use('/basicDetail',BasicDetailRoute);
app.use('/templateDetail',TemplateRoute);
app.use('/serviceDetail',ServiceDetailRoute);
app.use('/productDetail',ProductDetailRoute);
app.use('/galleryDetail',GalleryDetailRoute);
app.use('/testimonialDetail',TestimonialDetailRoute);
app.use('/socialMediaDetail',SocialMediaDetailRoute);
app.use('/popupBannerDetail',PopupBannerDetailRoute);
app.use('/vcard',AllDataRoute);

//Setup Mongoose conncetion ;
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected sucessfully");
    try {
      app.listen(PORT, () => {
        console.log(`Server is listening http://localhost:${PORT} number`);
      });
    } catch {
      console.log("Mongodb connection failure");
    }
  })
  .catch((error) => {
    console.log(error);
  });
