const { User } = require("../../models/users");
const fs = require("fs/promises");
const cloudinary = require("../../helpers/cloudinary");

const updateAvatar = async (req, res, next) => {
  const { _id, avatarId } = req.user;
  const { path: tempFile } = req.file;

  const result = await cloudinary.uploader.upload(tempFile, {
    gravity: "auto:face",
    height: 250,
    width: 250,
    crop: "fill",
    folder: "avatars",
  });
  if (avatarId) {
    await cloudinary.uploader.destroy(avatarId);
  }
  const user = await User.findByIdAndUpdate(
    _id,
    { avatarURL: result.url, avatarId: result.public_id },
    { new: true }
  );
  await fs.unlink(tempFile);
  res.json({
    avatarURL: user.avatarURL,
  });
};
module.exports = updateAvatar;
