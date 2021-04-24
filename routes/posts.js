const express=require('express');
const router=express.Router();
const passport=require('passport');
const postsController=require('../controllers/postsController');

// router.get('/viewpost',postsController.posts);
router.post('/create-post',passport.checkAuthentication,postsController.createPost);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);




module.exports=router;