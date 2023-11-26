const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.officialEmail,
        pass: process.env.accessToken
    }
});

module.exports = { transporter };