const express=require('express');
const app=express();
const cookieParse=require('cookie-parser');
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const { pass } = require('./config/mongoose');

app.use(express.urlencoded());
app.use();
//using cookie
app.use(cookieParse());

app.use(express.static('./assets'))

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name: 'social',
    //todo change the secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Server is Running on port:',port);
})