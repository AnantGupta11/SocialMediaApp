const mongoose=require('mongoose');

const resetPasswordSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        default:true
    }
});

const ForgotPassword= mongoose.model('ForgotPassword', resetPasswordSchema);

module.exports=ForgotPassword;