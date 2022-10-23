const { User } = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const addedUser = await User.create({
    email,
    subscription,
    password: hashedPass,
  });
  res.status(201).json({
    user: {
      email: addedUser.email,
      subscription: addedUser.subscription,
    },
  });
};

module.exports = signUp;
