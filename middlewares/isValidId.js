const { isValidObjectId } = require("mongoose");
const RequestError = require("../helpers/RequestError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(RequestError(400, "Bad request, invalid id"));
  }
  next();
};

module.exports = isValidId;
