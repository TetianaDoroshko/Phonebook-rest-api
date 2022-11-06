const signUp = require("./signUp");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");

module.exports = {
  signUp,
  login,
  logout,
  getCurrent,
  verifyEmail,
  resendEmail,
};
