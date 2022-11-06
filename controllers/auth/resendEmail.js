const { sendMail, RequestError } = require("../../helpers");
const { User } = require("../../models/users");

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  await sendMail(email, user.verificationToken);

  res.json({ message: "Verification email was sent" });
};

module.exports = resendEmail;
