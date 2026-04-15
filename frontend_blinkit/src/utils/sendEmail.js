import emailjs from "@emailjs/browser";

export const sendEmail = async ({ name, email, amount, payment }) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_SERVICE_KEY,
      import.meta.env.VITE_TEMPLATE_KEY,
      {
        name,
        email,
        amount,
        payment,
      },
      import.meta.env.VITE_PUBLIC_KEY
    );

    console.log("Email sent successfully", response);
    return response;
  } catch (error) {
    console.error("Email failed", error);
    throw error;
  }
};