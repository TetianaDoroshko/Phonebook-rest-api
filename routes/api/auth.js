const express = require("express");
const { signupSchema, loginSchema } = require("../../models/users");
const { validateBodyJoi, ctrlWrapper, auth } = require("../../middlewares");
const { signUp, login, logout, getCurrent } = require("../../controllers");

const router = express.Router();

router.post("/signup", validateBodyJoi(signupSchema), ctrlWrapper(signUp));

router.post("/login", validateBodyJoi(loginSchema), ctrlWrapper(login));

router.get("/logout", auth, ctrlWrapper(logout));

router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;
