const {
  getAllContact,
  getByIdContact,
  postContact,
  putContact,
  deleteContact,
  patchContact,
} = require("./contacts");
const { signUp, login, logout } = require("./auth");
const { getCurrent, updateSubscr } = require("./users");

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
};
