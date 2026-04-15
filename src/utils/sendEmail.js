import emailjs from "@emailjs/browser";

export const sendEmail = async ({ name, email, amount }) => {
  try {
    const response = await emailjs.send(
      "service_kfa6rf7",
      "template_k2hj38r",
      {
        name,
        email,
        amount,
        payment,
      },
      "eDG7KnyyjhD8muxij"
    );

    console.log("Email sent successfully ", response);
  } catch (error) {
    console.error("Email failed ", error);
  }
};