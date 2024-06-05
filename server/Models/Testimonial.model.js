import mongoose from 'mongoose';

let TestimonialSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,  
      },
    ClientName:{
        type:String,
        required:true
    },
    ClientFeedback:{
        type:String,
        required:true
    },
    ClientImage:{
        type:String,
        default:'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1716667954~exp=1716671554~hmac=ce3024b7d9c40305eefee6854f6b9404c9429afa64f2732a5e48a480280975cf&w=740'
    }
},{timestamps:true});


let TestimonialModel=mongoose.model('TestimonialData',TestimonialSchema);

export default TestimonialModel;