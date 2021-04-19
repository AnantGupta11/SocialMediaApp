const { user, id } = require('../config/mongoose');
const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:'Profile Page',
                    user:user
                })
            }
            return res.redirect('/users/signin');
        })
    }else{
        return res.redirect('/users/signin');
    }    
    
}
//sign out from profile
// module.exports.signOut=function(req,res){
//     return res.render('signin',res.clearCookie("user_id"));

// }

//render the signIn Page
module.exports.signIn=function(req,res){
    res.render('signIn',{
        title:'Sign In'
    })
}

//render the signUp page
module.exports.signUp=function(req,res){
    res.render('signUp',{
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
    //steps to authenticate
    // find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding User in SignIng in',err);
        }
        // handle user found
        if(user){
            //handle password which dont match
            if(user.password!=req.body.password){
                res.redirect('back');
            }else{
                //handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }
        }else{
            //handle user not found
            return res.redirect('back');
        }
    })
    
}

