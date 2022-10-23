const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/RequestError");
const { User } = require("../models/users");

const secret = process.env.SECRET_JWT;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }
    const { _id } = jwt.verify(token, secret);
    const user = await User.findOne({ _id });
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = auth;
