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
        data:Buffer,
        contentType:String
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