import UserAuth from "../Models/Register.model.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
//Post data to mongodb -- > Register User  :
export const RegisterUser = async(req, res) => {
  try {
    //Get all those field data from body:
    let {
      profile,
      email,
      userName,
      password,
      firstName,
      lastName,
      mobileNumber,
      location,
    } = req.body;
    //if user doesn't fill all those fields error through:
    if (!req.body.userName ||!req.body.firstName || !req.body.email || !req.body.password ) {
       res.status(400).json({ message: "All * fields Mandatory!" });
    } else {
      let userNameVerify=await UserAuth.findOne({userName:userName});
      if(userNameVerify){
        return res.status(400).json({message:'This UserName Already Exist!'})
      };
      //Find user Already Exist with this email or not
      let findUser = await UserAuth.findOne({ email: email });
      //If exist through on error
      if (findUser) {
       return res.status(400).json({ message: "User Already Exist with this email!" });
      } else {
        //Hashing password encrypt to secure clients passwords :
        let hashedPassword = await bcryptjs.hash(password, 10);
        let data = {
          profile,
          email,
          userName,
          password: hashedPassword, //Password stored secure with hashing type
          firstName,
          lastName,
          mobileNumber,
          location,
        };
        //If doesn't exist created new user data to database:
        let createUser = await UserAuth.create(data);
        res.status(201).json({
          message: "User Registered Sucessfully",
          data:createUser,
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({message: error.message });
  }
};

//Fetch data from mongodb -- > Get all Registered User Data  :
export const ReadRegisteredUserAllData = async (req, res) => {
  try {
    let findUser = await UserAuth.find({});
    //If exist through on error
    if (findUser) {
      res
        .status(200)
        .json({ message: "All User data Fetched", data: findUser });
    } else {
      res.status(400).json({ message: "All User data Fetched Failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Fetch data from mongodb -- > Get Specific Registered User Data  :
export const ReadRegisteredUserSpecificData = async (req, res) => {
  try {
    let { id } = req.params;
    //Find user Already Exist with this email or not
    let findUser = await UserAuth.findById(id);
    //If exist through on error
    if (findUser) {
      res.status(200).json({ message: "User data Fetched", data: findUser });
    } else {
      res.status(400).json({ message: "User data Fetched Failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update data to mongodb -- > Upate Specific Registered User Data  :
export const UpdateRegisteredUserSpecificData = async (req, res) => {
  try {
    let  {id}  = req.params;
    //Get all those field data from body:
    let { profile, email, location, firstName, lastName, mobileNumber } =
      req.body;
    let data =req.body;
    //If doesn't exist created new user data to database:
    let RegisterData=await UserAuth.findByIdAndUpdate(id, data);
    res.status(201).json({
      message: "Profile Updated Sucessfully",data:RegisterData
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Profile Updating Failed", error: error.message });
  }
};
//Update data to mongodb -- > Upate Specific Registered User Data  :
export const DeleteRegisteredUserSpecificData = async (req, res) => {
  try {
    let { id } = req.params;
    //If doesn't exist created new user data to database:
    await UserAuth.findByIdAndDelete(id);
    res.status(201).json({
      message: "Profile Deleted Sucessfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Profile Deleted Failed", error: error.message });
  }
};