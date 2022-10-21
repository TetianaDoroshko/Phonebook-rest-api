const express = require("express");
const { signupSchema } = require("../../models/contacts");
const { validateBodyJoi, ctrlWrapper } = require("../../middlewares");
const { signUp } = require("../../controllers");

const router = express.Router();

router.post("/signup", validateBodyJoi(signupSchema), ctrlWrapper(signUp));

module.exports = router;
