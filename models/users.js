const { model, Schema } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
});

const User = model("user", userSchema);

const signupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().insensitive(["starter", "pro", "business"]),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const updSubscrSchema = Joi.object({
  subscription: Joi.string()
    .insensitive(["starter", "pro", "business"])
    .required(),
});

// const patchSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email(),
//   phone: Joi.string().pattern(/^[0-9()-\s]+$/, "numbers"),
//   favorite: Joi.boolean(),
// }).min(1);

// const favSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

module.exports = { User, signupSchema, loginSchema, updSubscrSchema };
