const User=require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id, function(err,user){

        res.render('user_Profile',{
            title:'User Profile',
            profile_user:user
        });
    })
    
}

//update profile
module.exports.updateProfile=function(req,res){
    if(req.user.id== req.params.id){
        User.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email
        },function(err,user){
            return res.redirect('back');
        })
    }else{
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
