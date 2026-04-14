const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendMail = async (to, subject, msg) => {
  console.log("Sending email to:", to);

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: msg
  });

  console.log("Email sent:", info.response);
};

module.exports = sendMail;