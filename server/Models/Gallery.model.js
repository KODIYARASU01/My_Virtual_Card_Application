import mongoose from 'mongoose';


let GallerySchema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.String,
        required: true,  
      },
      GalleryImage:{
        type:String,
        required:true
      }
    ,
    GalleryURL:{
        type:String
    }
},
{timestamps:true});

let GalleryModel=mongoose.model('GalleryData',GallerySchema);
export default GalleryModel;