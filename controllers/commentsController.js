const Comment=require('../models/comment');
const Post=require('../models/post');
const { post } = require('../routes/comments');


module.exports.create=function(req,res){

    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err, comment){
                if(err){
                    console.log('Error in creating comment',err);
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
                
            })
        }
    })

}
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        // if(err){
        //     console.log('Error in finding comment for delete',err);
        //     return;
        // }
        // pending to make delete functionality for post oner
        if((comment.user == req.user.id) || (comment.post==comment.user)){
            //first go to post where is comment array then delete the comment 
            // from that array

            let postId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull: {comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }   
    })
}