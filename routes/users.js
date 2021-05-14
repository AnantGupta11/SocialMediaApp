const { Router } = require('express');
const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/usersController');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.updateProfile);
router.get('/signin',usersController.signIn);
router.get('/signup',usersController.signUp);


router.post('/create', usersController.createUser);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate('local' ,
{failureRedirect: '/users/signin'},
),usersController.createSession);

router.get('/signout',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{ scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/users/signin'}),usersController.createSession);

module.exports=router;