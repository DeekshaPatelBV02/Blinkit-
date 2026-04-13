const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMail = async (to, subject, msg) => {
    try {
        console.log("Sending email to:", to);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: to,
            subject: subject,
            html: msg
        });

        console.log("Email sent:", info.response);

    } catch (error) {
        console.log("Email error:", error);
    }
};

module.exports = sendMail;