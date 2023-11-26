const dotenv = require("dotenv");
const { transporter } = require('../config/MailConfig');
dotenv.config();

const sendMail =async (toEmail, subject, content) => {
    const mailOptions = {
        from: process.env.officialEmail,
        to: toEmail,
        subject: subject,
        html: content
    };
   
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({ status: false, msg: error });
            } else {
                console.log('Email sent: ' + info.response);
                resolve({ status: true, msg: "Mail sent successfully." });
            }
        });
    });
    
};

module.exports = {sendMail};

