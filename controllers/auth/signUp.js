const { User } = require("../../models/users");
const RequestError = require("../../helpers/RequestError");

const signUp = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({email});
  if (user) {
    throw RequestError(409, "Email in use");
  }
     res.json({ message: "contact deleted" });
  }
};

module.exports = signUp;
