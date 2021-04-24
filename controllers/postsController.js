const Post=require('../models/post');
const Comment=require('../models/comment');
// module.exports.posts=function(req,res){
//     return res.render('home',{
//         title:'Posts'
//     })
// }
module.exports.createPost=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('Error in creating Post',err);
        }
        return res.redirect('back');
    })
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id, function(err,post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log('Error in deleting comments of post',err);
                    return;
                }
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}