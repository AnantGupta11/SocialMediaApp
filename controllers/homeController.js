// const { posts } = require("./postsController");
const Post=require('../models/post');
const User=require('../models/user');
module.exports.home =  async function(req,res){
    // console.log(req.cookies);
    // res.cookie('id', 25);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: 'Home Page',
    //         posts:posts
    //     });
    // })
    try{
        let posts= await Post.find({})
        //poppulate the user for each post
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path:'user'
            },
            populate:{
                path:'likes'
            }
        }).populate('comments')
        .populate('likes');
        let users= await User.find({})
        
    
        return res.render('home',{
            title: 'Social | Home',
            posts:posts,
            all_users:users
        });       
            
    }catch(err){
        console.log('Error',err);
        return;
    }
    
    
    
}