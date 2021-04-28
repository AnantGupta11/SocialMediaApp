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
                    console.log(data);
                },error: function(error){
                    console.log(responseText);
                }
            })
        })
    }

    //method to create the post in dom


    createPost();
}