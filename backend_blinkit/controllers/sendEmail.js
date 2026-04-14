const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Transport verify error:", error);
  } else {
    console.log("Mail server is ready");
  }
});

const sendMail = async (to, subject, msg) => {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: msg
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("MAIL ERROR FULL:", error);
  }
};

module.exports = sendMail;