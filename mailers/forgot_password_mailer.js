const nodemailer=require('../config/nodemailer');

exports.forgotPassword=(user,accessToken)=>{
    console.log('Forgot Password Mailer');
    let htmlString=nodemailer.renderTemplate({user:user,accessToken:accessToken}, '/password/forgotpass.ejs');
    nodemailer.transporter.sendMail({
        from: 'sanant91225@gmail.com',
        to: user.email,
        subject: 'Reset Password',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail for forgot password',err);
            return;
        }
        console.log('Message Send',info);
        return;
    })
}