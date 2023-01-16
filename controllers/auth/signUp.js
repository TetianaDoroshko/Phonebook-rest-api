const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { RequestError, sendMail } = require("../../helpers");

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = v4();
  const token = v4();

  const addedUser = await User.create({
    name,
    email,
    password: hashedPass,
    avatarURL: gravatar.url(email, { s: "200", d: "retro" }, true),
    verificationToken,
    token,
  });

  await sendMail(email, verificationToken);

  res.status(201).json({
    user: {
      name: addedUser.name,
      email: addedUser.email,
      subscription: addedUser.subscription,
      avatarURL: addedUser.avatarURL,
    },
    token,
  });
};
module.exports = signUp;
