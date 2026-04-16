const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  
});

async function sendMail(to,subject,html){
  try{
    await transporter.sedMail({
      from:(process.env.EMAIL_USER),
      to,
      subject,
      html,
    });
    console.log("Emailsent succesfully to",to);
  }catch(error){
    console.log("Email sending failed:",error);
    throw error;
  }
}
module.exports=sendMail;