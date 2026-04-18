const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: (process.env.EMAIL_USER),
    pass: (process.env.EMAIL_PASS)
  },
});

async function sendMail(to, subject, html) {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.response);

  } catch (error) {
    console.log("Email sending failed:", error.message);
  }
}