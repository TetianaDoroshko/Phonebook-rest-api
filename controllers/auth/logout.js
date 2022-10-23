const { User } = require("../../models/users");
const RequestError = require("../../helpers/RequestError");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const updUser = await User.findByIdAndUpdate(
    _id,
    { token: null },
    { new: true }
  );
  if (!updUser) {
    throw RequestError(401, "Not authorized");
  }
  res.sendStatus(204);
};

module.exports = logout;
