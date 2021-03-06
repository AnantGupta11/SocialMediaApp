// const { response } = require("express");

{
    //method to submit the form data for new post using ajax
    let createPost=function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));

                    //call the create comment class
                    new PostComments(data.data.post._id);

                    //  enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to create the post in dom
    let newPostDom=function(post){
        return $(`<li id="post-${ post._id}" class="post-class">
                    <div class="post-wrapper">
                        <!-- <span id="2"> -->
                        <div class="post-header">
                            <div class="post-avatar">
                                <img
                                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                                alt="user-pic"
                                />
                                <div>
                                <span class="post-author">${ post.user.name }</span>
                                <span class="post-time">a minute ago</span>
                                </div>
                            </div>
                            <div class="post-content">${ post.content }</div>
                            <div className="post-actions">
                                <div className="post-like">
                                <!-- <img
                                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                                    alt="likes-icon"
                                /> -->
                                
                                <% if (locals.user){ %>
                                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                            0 Likes
                                    </a>
                                    <% }
                            
                                </div>
                                <div class="post-comments-icon">
                                    <!-- <img
                                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                                    alt="comments-icon"
                                    /> -->
                                    <span>
                                        <ul id="post-comments-${ post._id }">
                                             
                                        </ul>
                                    </span>
                                </div>
                            </div>
                
                            <div class="post-comment-box">
                                    <form action="/comments/create" method="POST" id="post-${ post._id }-comments-form">
                                        <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                        <input type="hidden" name="post" value="${ post._id }" >
                                        <input type="submit" value="Add Comment">
                                    </form>
                                <!-- <input placeholder="Start typing a comment" /> -->
                            </div>
                        </div>
                    </div>
                </li>`)
                
    }


    //method to delete a post from DOM

    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    // loop over all the existing posts on the page(when The windows loads for the first time)and call the delete 
    // post method on delete link of each, also add Ajax (using the class wee have created) to the delete button of each 
    let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button',self);
            deletePost(deleteButton);

            //get the post's id by splitting the id attribute

            let postId= self.prop('id').split("-")[1];
            new PostComments(postId);
        })
    }


    createPost();
   convertPostsToAjax();
}





// <li id="post-${ post._id}">
                    //     <p id="post-view">
                    //         <div id="post-first-part">
                    //             <small id="post-user-name">
                    //                 ${ post.user.name }
                    //             </small>
                    //             <small id="post-delete-button">
                    //                 <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>
                    //             </small>
                    //         </div>
                    //         <small id="post-content">
                    //             ${ post.content }                                                        
                    //         </small>
                    //         <small>
                            
                    //             <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                    //                 0 Likes
                    //             </a>
                            
                    //         </small>                           
                    //     </p>
                    //     <div class="post-comments">
                            
                    //             <form action="/comments/create" method="POST" id="post-${post._id}">
                    //                 <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    //                 <input type="hidden" name="post" value="${ post._id }" >
                    //                 <input type="submit" value="Add Comment">
                    //             </form>
                    
                            
                    
                    //         <div class="post-comments-list">
                    //             <ul id="post-comments-${ post._id }">
                                    
                    //             </ul>
                    //         </div>
                    //     </div>
                        
                    // </li>