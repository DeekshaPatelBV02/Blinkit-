import emailjs from "@emailjs/browser";

export const sendStatusEmail = async ({
  to_email,
  customer_name,
  order_id,
  order_status,
  payment_method,
  address,
}) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email,
        customer_name,
        order_id,
        order_status,
        payment_method,
        address,
      },
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      }
    );

    console.log("Status email sent:", response);
    return response;
  } catch (error) {
    console.error("Status email failed:", error);
    throw error;
  }
};
