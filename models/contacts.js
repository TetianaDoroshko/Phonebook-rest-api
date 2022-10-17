const { model, Schema } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /^[0-9()-\s]+$/,
      index: true,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
});

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9()-\s]+$/, "numbers")
    .required(),
  favorite: Joi.boolean(),
});

const patchSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9()-\s]+$/, "numbers"),
  favorite: Joi.boolean(),
}).min(1);

const favSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { Contact, addSchema, patchSchema, favSchema };
