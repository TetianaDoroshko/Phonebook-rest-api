const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const validateBodyJoi = require("./validateJoi");
const auth = require("./checkAuth");
const uploadMulter = require("./uploadMulter");

module.exports = {
  ctrlWrapper,
  isValidId,
  validateBodyJoi,
  auth,
  uploadMulter,
};
