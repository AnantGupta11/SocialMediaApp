const express = require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
console.log('loaded router');
router.get('/',homeController.home);
module.exports=router;