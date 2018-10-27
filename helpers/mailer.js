const mailer = require('nodemailer');
const transport = mailer.createTransport({
    service: "SendGrid",
    auth:{
        user: process.env.SEND_USER,
        pass: process.env.SEND_PASS
    }
});

transport.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

exports.send = (options) => {
    const mailOptions = {  
        subject: options.subject,
        from: `Please confirm your account <noreply@myfiles.com>`,
        to: options.email,
        text: `Hola ${options.username}, por favor confirma tu registro`,
        html: '<b><a href="http://localhost:3000/auth/confirm/'+options.hashName+'">Presiona aqui para confirmar</></b>'
    };
    return transport.sendMail(mailOptions);
};
