import mongoose from 'mongoose';


let TemplateSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:'User'
    },
    currentTemplate:{
        type:Boolean,
        default:false,
        required:[true,'Select Your VCard Template!']
    }
},
{timestamps:true});


let Current_VCardTemplate=mongoose.model('Current_VCardTemplate',TemplateSchema);

export default Current_VCardTemplate;