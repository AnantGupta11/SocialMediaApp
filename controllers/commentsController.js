const Comment=require('../models/comment');
const Post=require('../models/post');
const { post } = require('../routes/comments');
const comments_mailer= require('../mailers/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like=require('../models/like');

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
            // comments_mailer.newComment(comment);
            let job=queue.create('emails', comment).save(function(err){
                if(err){
                        console.log('Error in creating a queue',err);
                        return;
                }
                console.log('Job Enqueue',job.id);
            });
            if(req.xhr){
                
                //similar for comments to fetch the user's id!
                return res.status(200).json({
                    data: {
                        comment:comment
                    },
                    message: 'Comment Published'
                })
            }
            req.flash('succss', 'Comment Published');
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
        if(comment.user == req.user.id ){
            //first go to post where is comment array then delete the comment 
            // from that array

            let postId=comment.post;
            
            comment.remove();

            let post=await Post.findByIdAndUpdate(postId, {$pull: {comments:req.params.id}});
            
            //destroy the associated likes for this comment
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});

            //send the comment id which was deleted back to views
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id:req.params.id
                    },
                    message: 'Comment Deleted'
                })
            }
            req.flash('success','Comment Deleted');
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