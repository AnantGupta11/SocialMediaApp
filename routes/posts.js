const express=require('express');
const router=express.Router();
const postsController=require('../controllers/postsController');

router.get('/viewpost',postsController.posts);





module.exports=router;