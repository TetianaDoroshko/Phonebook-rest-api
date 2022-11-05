const {
  getAllContact,
  getByIdContact,
  postContact,
  putContact,
  deleteContact,
  patchContact,
} = require("./contacts");
const { signUp, login, logout, getCurrent, verifyEmail } = require("./auth");
const { updateSubscr, updateAvatar } = require("./users");

module.exports = {
  getAllContact,
  getByIdContact,
  postContact,
  putContact,
  deleteContact,
  patchContact,
  signUp,
  login,
  logout,
  getCurrent,
  updateSubscr,
  updateAvatar,
  verifyEmail,
};
