const User=require('../models/user');
const path= require('path');
const fs=require('fs');
const ForgotPassword= require('../models/reset_password');
const crypto=require('crypto');
const forgotPasswordMailer= require('../mailers/forgot_password_mailer');

module.exports.profile=function(req,res){
    User.findById(req.params.id, function(err,user){
        // console.log('inside profile');
        return res.render('user_Profile',{
            title:'User Profile',
            profile_user:user
        });
    });
    
}

//update profile
module.exports.updateProfile=async function(req,res){
    // if(req.user.id== req.params.id){
    //     User.findByIdAndUpdate(req.params.id,{
    //         name:req.body.name,
    //         email:req.body.email
    //     },function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
        if(req.user.id== req.params.id){
            try{
            
                let user= await User.findById(req.params.id);
                User.uploadedAvatar(req,res,function(err){
                    if(err){
                        console.log('------->Multer Error',err);
                        return;
                    }
                    user.name=req.body.name;
                    user.email=req.body.email;
                    if(req.file){
                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        //this is saving the path of the uploaded file into the avatar field in the user
                        user.avatar=User.avatarPath + '/' + req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
                })

            }catch(error){
                req.flash('Error',err);
                console.log('Error',err);
                return res.redirect('back');
            }
        }else{
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }
    
}

//render the signIn Page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signIn',{
                title:'Sign In'
    })
        
}

//render the signUp page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signUp',{
        title:'Sign Up'
    })
}

//get signUp data
module.exports.createUser=function(req,res){
    if(req.body.password != req.body.confirmpassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error in Finding User in signUp',err);
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in Creating User in SignUp',err);
                    return; 
                }
                return res.redirect('/users/signin'); 
            })
        }else{
            res.redirect('/users/signin');
        }
    })
}

//create session for users
module.exports.createSession=function(req,res){
    req.flash('success', 'Logged In SuccessFully');
    return res.redirect('/');
}

//destroy session
module.exports.destroySession= function(req,res){
    
    req.logout();
    req.flash('success', 'Logged out SuccessFully');
    return res.redirect('/');
}

//forgot password
module.exports.forgotPass=function(req,res){
        
        res.render('forgotten_password',{
            title: "Forgot Password"
        });
}

//sending mail to reset password
module.exports.resetMail = async function(req,res){
    console.log(req.body.email);
    try{
       User.findOne({email: req.body.email}, function(err,user){
           if(err){
            req.flash('error', err);
            return;
           }
           if(!user){
                req.flash('error','Invalid Email!!');
                return res.redirect('back');
           }
           if(req.body.confirmpassword != req.body.password){
                req.flash('error','Password and Confirm Password are not same'); 
            }
            ForgotPassword.create({
                user:user._id,
                accessToken: crypto.randomBytes(20).toString('hex'),
                isValid: false
            })    
            
            forgotPasswordMailer.forgotPassword(user, ForgotPassword.accessToken);
            // req.flash('success','Check your Email.');
            user.password=req.body.password;
            user.save();
            return res.redirect('back');
       })
    }catch(err){
        req.flash('error','Invalid Email Id');
    }
   
}
module.exports.forgotPasswordLink=async function(req,res){
    res.render('forgotPassword',{
        title: "Change Password"
    });   
}
module.exports.resetPassword= async function(req,res){
    
}