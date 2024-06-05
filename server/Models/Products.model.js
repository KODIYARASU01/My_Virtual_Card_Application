import mongoose from 'mongoose';

let ProductSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,  
      },
    ProductName:{
        type:String,
        required:true
    },
    ProductURL:{
        type:String
    }
    ,
    ProductDescription:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:Number,
        default:0,
        required:true
    },
    ProductImage:{
        type:String,
        required:true
    }
},{timestamps:true});


let ProductModel=mongoose.model('ProductData',ProductSchema);

export default ProductModel;