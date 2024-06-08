import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
let app = express();
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

//Port initializing:
let PORT = process.env.PORT || 3000;
//Cors Policy connect frontend and backend with same port:
app.use(cors());
//This will help you to send data to server in json formate:
app.use(express.json({limit:'30mb'}));
//This will help you to allow file upload size limit
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  console.log(req.path);
  res.send("Hello");
});

// Api All Routes:
app.use('/auth',RegisterRoute);
app.use('/auth',LoginRoute);
app.use('/basicDetail',BasicDetailRoute);
app.use('/templateDetail',TemplateRoute);
app.use('/serviceDetail',ServiceDetailRoute);
app.use('/productDetail',ProductDetailRoute);
app.use('/galleryDetail',GalleryDetailRoute);
app.use('/testimonialDetail',TestimonialDetailRoute);
app.use('/socialMediaDetail',SocialMediaDetailRoute);
app.use('/popupBannerDetail',PopupBannerDetailRoute);
//Mongodb conncetion ;
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
