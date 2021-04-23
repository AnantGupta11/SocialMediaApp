const express = require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
console.log('loaded router');



router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

//for any further router access from here
//router.use('/routername',require('./routerfile'));







module.exports=router;