const nodemailer= require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sanant91225@gmail.com',
        pass: '321@tnanA'
    }   
});

let renderTemplate=(data, relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering html',err);
                return;
            }
            mailHtml=template;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplate:renderTemplate
}