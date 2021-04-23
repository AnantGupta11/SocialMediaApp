const { Router } = require('express');
const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/usersController');


router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/signin',usersController.signIn);
router.get('/signup',usersController.signUp);


router.post('/create', usersController.createUser);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate('local' ,
{faliureRedirect: '/users/signin'},
),usersController.createSession);

router.get('/signout',usersController.destroySession);

module.exports=router;