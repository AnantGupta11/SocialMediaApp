const Post=require('../models/post');

module.exports.posts=function(req,res){
    return res.render('home',{
        title:'Posts'
    })
}
module.exports.createPost=function(req,res){
    Post.create(req.body,function(err,post){
        if(err){
            console.log('Error in creating Post',err);
        }
    })
}