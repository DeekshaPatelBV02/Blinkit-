const SibApiV3Sdk = require("@getbrevo/brevo");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendMail = async (to, subject, msg) => {
  try {
    console.log("Sending email to:", to);

    const emailData = {
      to: [{ email: to }],
      sender: { email: process.env.EMAIL_USER },
      subject: subject,
      htmlContent: msg,
    };

    const response = await apiInstance.sendTransacEmail(emailData);

    console.log("Email sent:", response.messageId);

  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};

module.exports = sendMail;