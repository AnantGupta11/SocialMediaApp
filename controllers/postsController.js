const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.createPost= async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        
        if(req.xhr){
            //if we want to populate just the name of hte user (we'll not want to send the password in the API),
            //this is how we do it
            post=await post.populate('user','name').execPopulate();
            return res.status(200).json({
                data: {
                    post:post
                },
                message: 'Post Created'
            })
        }

        req.flash('success','Post Published');
        return res.redirect('back');
    }catch(err){
        req.flash('Error',err);
        console.log('Error',err);
        return res.redirect('back');
    }
        
}

module.exports.destroy = async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //.id means converting the object id into string
        
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id:req.params.id
                    },
                    message: 'Post Deleted'
                })
            }

            req.flash('success','Post with associated comments Destroyed');
            return res.redirect('back');
        }else{
            req.flash('error','You can not delete this post');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('Error',err);
        console.log('Error',err);
        return res.redirect('back');
    }
    
}