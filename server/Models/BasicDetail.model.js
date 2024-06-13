import mongoose from "mongoose";


let BasicDetailSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
    VCardName:{
        type:String,
        required:true
    },
    Occupation:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true , 
       
    },
    Profile:{
        type:String,
        required:true
    },
    Banner:{
        // data:Buffer,
        // contentType:String,
    type:String,
    default:'https://img.freepik.com/free-photo/cement-wall-floor-copy-space_53876-30237.jpg?t=st=1716040667~exp=1716044267~hmac=37c1f0faf9137d781a0aa0d1436b486b6e0a620fec789a836ab08533c16cbeeb&w=826'
    },
    BannerName:{
        type:String,
      
        },
    FirstName:{
        type:String,
        required:true 
    },
    LastName:{
        type:String,
        required:true 
    },
    Email:{
        type:String,
        required:true 
    },
    MobileNumber:{
        type:Number,
        required:true 
    },
    AlternateEmail:{
        type:String,
   
    },
    AlternateMobileNumber:{
        type:Number,
   
    },
    Location:{
        type:String,
        required:true 
    },
    JobTitle:{
        type:String,
        required:true
    },
    InquiryToggleSwitch:{
        type:Boolean
    },
    QRToggleSwitch:{
        type:Boolean
    },
    AppoinmentToggleSwitch:{
        type:Boolean
    },
    ContactToggleSwitch:{
        type:Boolean
    },
},
{timestamps:true}
);



let BasicDetails=mongoose.model('BasicDetails',BasicDetailSchema);

export default BasicDetails;