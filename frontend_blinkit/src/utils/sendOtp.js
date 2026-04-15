import emailjs from "@emailjs/browser";

export const sendOtpEmail = async (email, otp) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_SERVICE_KEY,
      import.meta.env.VITE_OTP_TEMPLATE_KEY,
      {
        email,
        otp,
      },
      import.meta.env.VITE_PUBLIC_KEY
    );

    console.log("EMAILJS SUCCESS:", response);
    return true;
  } catch (error) {
    console.error("EMAILJS ERROR:", error);
    return false;
  }
};