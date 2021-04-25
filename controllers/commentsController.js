const Comment=require('../models/comment');
const Post=require('../models/post');
const { post } = require('../routes/comments');


module.exports.create=async function(req,res){
    try{
        let post= await Post.findById(req.body.post)
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            post.comments.push(comment);
            post.save();
            res.redirect('/');            
        }
    }catch(err){
        console.lor('Error',err);
        return;
    }    
}
module.exports.destroy= async function(req,res){
    try{
        let comment= await Comment.findById(req.params.id)
        
        // pending to make delete functionality for post oner
        if((comment.user == req.user.id) || (comment.post==comment.user)){
            //first go to post where is comment array then delete the comment 
            // from that array

            let postId=comment.post;
            comment.remove();

            let post=await Post.findByIdAndUpdate(postId, {$pull: {comments:req.params.id}});
            
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }   
    }catch(err){
        console.lor('Error',err);
        return;
    }
    
    
}