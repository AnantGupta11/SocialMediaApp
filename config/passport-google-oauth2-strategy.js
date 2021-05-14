const passport= require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '215928905618-t8066f6tbnieuh541uqehjstr37a3d5u.apps.googleusercontent.com',
        clientSecret: '0gqGezrByzkAzswCYOl63B6W',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error',err);
                return;
            }
            // console.log(profile);
            if(user){
                //if user found set the user
                return done(null,user);
            }else{
                //not found create the user and set
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in creating user google strategy-passport',err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }
))

module.exports = passport;