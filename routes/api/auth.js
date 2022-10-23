const express = require("express");
const { signupSchema, loginSchema } = require("../../models/users");
const { validateBodyJoi, ctrlWrapper } = require("../../middlewares");
const { signUp, login } = require("../../controllers");

const router = express.Router();

router.post("/signup", validateBodyJoi(signupSchema), ctrlWrapper(signUp));

router.post("/login", validateBodyJoi(loginSchema), ctrlWrapper(login));

module.exports = router;
