const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { RequestError, sendMail } = require("../../helpers");

const signUp = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const verificationToken = v4();

  const addedUser = await User.create({
    email,
    subscription,
    password: hashedPass,
    avatarURL: gravatar.url(email, { s: "200", d: "retro" }, true),
    verificationToken,
  });

  await sendMail(email, verificationToken);

  res.status(201).json({
    user: {
      email: addedUser.email,
      subscription: addedUser.subscription,
      avatarURL: addedUser.avatarURL,
    },
  });
};

module.exports = signUp;
