const express = require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
console.log('loaded router');



router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
//for any further router access from here
//router.use('/routername',require('./routerfile'));

router.use('/api',require('./api'));
// router.use('/chats',require('./chats'));




module.exports=router;