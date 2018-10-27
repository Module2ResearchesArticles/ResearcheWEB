const mailer = require('mailer');
const transport = mailer.createTransport({
    service: "SendGrid",
    auth:{
        user: process.env.SEND_USER,
        pass: process.env.SEND_PASS
    }
});

exports.send = (options) => {
    const mailOptions = {
        subject: options.subject,
        from: `Please comfirm your account <noreply@myfiles.com>`,
        to: options.email,
        text: options.message,
        html:`<h1>${options.message}</h1>`
    };

    return transport.sendMail(mailOptions);
};
