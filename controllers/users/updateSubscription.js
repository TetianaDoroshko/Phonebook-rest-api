const { User } = require("../../models/users");

const updateSubscr = async (req, res, next) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  const updUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json({
    email,
    subscription: updUser.subscription,
  });
};
module.exports = updateSubscr;
