const { User } = require("../../models/users");
const fs = require("fs/promises");
const path = require("path");
const RequestError = require("../../helpers/RequestError");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempFile, filename } = req.file;
  try {
    const avatarName = `${_id}-${filename}`;
    const avatarFile = path.join(avatarDir, avatarName);
    await fs.rename(tempFile, avatarFile);
    const avatar = await Jimp.read(avatarFile);
    const formAvatarFile = await avatar.resize(250, 250).write(avatarFile);
    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL: `/avatars/${avatarName}` },
      { new: true }
    );
    res.json({
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempFile);
    throw RequestError(401, "Not authorized");
  }
};
module.exports = updateAvatar;
