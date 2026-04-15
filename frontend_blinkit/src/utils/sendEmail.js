import emailjs from "@emailjs/browser";
require("dotenv").config();

export const sendEmail = async ({ name, email, amount, payment }) => {
  try {
    const response = await emailjs.send(
      process.env.SERVICE_KEY,
      process.env.TEMPLATE_KEY,
      {
        name,
        email,
        amount,
        payment,
      },
      process.env.PUBLIC_KEY
    );

    console.log("Email sent successfully", response);
    return response;
  } catch (error) {
    console.error("Email failed", error);
    throw error;
  }
};