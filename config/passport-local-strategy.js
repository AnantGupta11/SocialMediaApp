const passport= require('passport');

const LocalStrategy= require('passport-local').Strategy;
const User=require('../models/user');

//Authentication using Passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user ---Passport',err);
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username And PassWord');
                return done(null,false);
            }
            return done(null,user);
        })

    }
));

//serliazed the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})





//deserlized the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user deserliazed',err);
        }
        return done(null,user);
    })
})

module.exports=passport;