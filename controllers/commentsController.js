const Comment=require('../models/comment');
const Post=require('../models/post');
const { post } = require('../routes/comments');
const comments_mailer= require('../mailers/comments_mailer');

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
            comment=await comment.populate('user','name email').execPopulate();
            comments_mailer.newComment(comment);
            if(req.xhr){
                
                //similar for comments to fetch the user's id!
                return res.status(200).json({
                    data: {
                        comment:comment
                    },
                    message: 'Comment Published'
                })
            }
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
            
            //send the comment id which was deleted back to views
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id:req.params.id
                    },
                    message: 'Comment Deleted'
                })
            }

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }   
    }catch(err){
        console.log('Error',err);
        return;
    }
    
    
}