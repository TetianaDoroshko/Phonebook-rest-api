const Joi = require("joi");

const validationAdd = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9()-\s]+$/, "numbers")
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }
  next();
};

const validationPatch = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9()-\s]+$/, "numbers"),
  }).min(1);
  const { error } = schema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = { validationAdd, validationPatch };
