const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (email, verificationToken) => {
  console.log(SENDGRID_API_KEY, BASE_URL);
  const message = {
    to: email,
    from: "yanisolua@gmail.com",
    subject: "Confirm email",
    html: `<p>Please, <a href='${BASE_URL}/auth/verify/${verificationToken}'>click</a> to confirm your email.</p>`,
  };
  await sgMail.send(message);
  console.log("sent");
  return true;
};

module.exports = sendMail;
