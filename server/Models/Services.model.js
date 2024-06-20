import mongoose from 'mongoose';

let serviceSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,
        
      },
    ServiceName:{
        type:String,
        required:true
    },
    ServiceURL:{
        type:String
    }
    ,
    ServiceDescription:{
        type:String,
        required:true
    },
    ServiceImage:{
        data: Buffer,
      contentType: String,
        // required:true
    }
},
{timestamps:true}
);


let ServiceModel=mongoose.model('ServiceData',serviceSchema);
export default ServiceModel;