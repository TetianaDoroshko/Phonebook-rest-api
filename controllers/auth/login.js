const { User } = require("../../models/users");
const RequestError = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_JWT;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    throw RequestError(401, "Email or password is wrong");
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw RequestError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token: token }, { new: true });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
