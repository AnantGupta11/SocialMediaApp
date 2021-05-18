const nodemailer =require('../config/nodemailer');

//this is another way of exporting 
exports.newComment = (comment)=>{
    // console.log('Inside newComment Mailer');
    let htmlString= nodemailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'sanant91225@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending the mail',err);
            return;
        }
        console.log('Mail deleivered',info);
        return;
    });
}