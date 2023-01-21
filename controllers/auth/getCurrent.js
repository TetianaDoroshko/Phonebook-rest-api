const getCurrentUser = async (req, res, next) => {
  const { name, email, subscription, avatarURL } = req.user;
  res.json({
    name,
    email,
    subscription,
    avatar: avatarURL,
  });
};
module.exports = getCurrentUser;
