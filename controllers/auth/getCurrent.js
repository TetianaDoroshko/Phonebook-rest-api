const getCurrentUser = async (req, res, next) => {
  const { name, email, subscription } = req.user;
  res.json({
    name,
    email,
    subscription,
  });
};
module.exports = getCurrentUser;
