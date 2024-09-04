const sgMail = require("@sendgrid/mail");

const sendMail = async (mailId, message) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: `${mailId}`,
    from: "priyanka.panda@instrive.in",
    subject: "Greetings",
    text: message,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendMail;
