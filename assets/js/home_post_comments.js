// Let's implement this via classes

// this class would be initialize for every post on the page
//1. when the page loads
//2. creation of every post dynamically via AJAX

class PostComments{
    //constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId=postId;
        this.postContainer= $(`#post-${postId}`);
        this.newCommentForm= $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self=this;

        //call for all existing comments
        $(' .delete-comment-button',this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let pSelf=this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();

            let self=this;

            $.ajax({
                type:'post',
                url: '/comments/create',
                data: $(self).serialize(), //serialize is use to transfer data in the form of json
                success: function(data){
                    let newComment=pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button',newComment));
                    
                    //  enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));

                    new Noty({
                        theme:'relax',
                        text: "Comment Published!",
                        type: 'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    }

    newCommentDom(comment){
        return $(`<li id="comment-${comment._id}">
                    <p>
                        
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id} ">X</a>
                        </small>
                    
                        ${ comment.content }
                        <br>
                        <small>
                        ${ comment.user.name}
                        </small>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                    0 Likes
                                </a>
                            
                        </small>

                    </p>    
    
                </li>`);
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }
}
