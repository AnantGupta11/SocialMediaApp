module.exports.profile=function(req,res){
    res.render('user_Profile',{
        title:'User Profile'
    });
}

//render the signIn Page
module.exports.signIn=function(req,res){
    res.render('signIn',{
        title:'Sign In'
    })
}

//render the signUp page
module.exports.signUp=function(req,res){
    res.render('signUp',{
        title:'Sign Up'
    })
}