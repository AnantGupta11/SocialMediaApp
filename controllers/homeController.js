// const { posts } = require("./postsController");
const Post=require('../models/post');
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('id', 25);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: 'Home Page',
    //         posts:posts
    //     });
    // })

    //poppulate the user for each comment
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: 'Social || Home',
            posts:posts
        });
    });
    
    
}