import emailjs from "@emailjs/browser";

export const sendOtpEmail = async (email, otp) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_SERVICE_KEY,
      import.meta.env.VITE_OTP_TEMPLATE_KEY, 
      {
        email: email,
        otp: otp,
      },
      import.meta.env.VITE_PUBLIC_KEY
    );

    console.log("OTP sent");
  } catch (error) {
    console.error("OTP failed", error);
  }
};