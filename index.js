const express=require('express');
const app=express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'))

app.use(expressLayouts);
// use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Server is Running on port:',port);
})