const { Router } = require('express');
const express=require('express');
const router=express.Router();

const usersController=require('../controllers/usersController');


router.get('/profile',usersController.profile);
router.get('/signin',usersController.signIn);
router.get('/signup',usersController.signUp);
router.use('/posts',require('./posts'));




module.exports=router;