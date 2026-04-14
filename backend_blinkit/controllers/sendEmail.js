const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
  timeoutInSeconds: 30,
});

const sendMail = async (to, subject, msg) => {
  try {
    console.log("Sending email to:", to);

    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent: msg,
      sender: {
        email: process.env.EMAIL_USER,
        name: "Blinkit Clone",
      },
      to: [{ email: to }],
    });

    console.log("Email sent. Message ID:", result.messageId);
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};

module.exports = sendMail;