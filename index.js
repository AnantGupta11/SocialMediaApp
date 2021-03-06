const express=require('express');
const cookieParse=require('cookie-parser');
const app=express();

const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passpotJWT= require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const { pass } = require('./config/mongoose');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware= require('./config/middleware');
// setup the chat server to be used with socket.io
const chatServer= require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat Server is listing on port 5000');

app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix:'/css'
}))
app.use(express.urlencoded());
// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//using cookie
app.use(cookieParse());

app.use(express.static('./assets'))

//make the uploads part available for browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//MongoStore is use to store the session cookie in db
app.use(session({
    name: 'social',
    //todo change the secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        if(err){
            console.lof(err || 'Connect-mongo is ok');
        }
    }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Server is Running on port:',port);
})