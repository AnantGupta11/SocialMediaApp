const Post=require('../../../models/post');
const Comment= require('../../../models/comment');
module.exports.index= async function(req,res){

    let posts= await Post.find({})
        //poppulate the user for each post
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path:'user'
            }
        })

    return res.json(200,{
        message: 'List Of Posts',
        posts: posts
    })
}
module.exports.destroy = async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //.id means converting the object id into string
        
        // if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});

            

            // req.flash('success','Post with associated comments Destroyed');
            return res.status(200).json({
                message: 'Post And Associated comments deleted Successfully'
            });
        // }else{
        //     req.flash('error','You can not delete this post');
        //     return res.redirect('back');
        // }

    }catch(err){
        // req.flash('Error',err);
        console.log('Error',err);
        return res.status(500).json({
            message: 'Internal server Error'
        });
    }
    
}