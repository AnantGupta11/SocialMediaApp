const express = require('express');
const router=express.Router();

const likesController= require('../controllers/likesController');
//const Like = require('../models/like');

router.post('/toggle',likesController.toggleLike);




module.exports=router;