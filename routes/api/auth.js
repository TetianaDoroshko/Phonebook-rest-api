const express = require("express");
const {
  signupSchema,
  loginSchema,
  verifySchema,
} = require("../../models/users");
const {
  validateBodyJoi,
  ctrlWrapper,
  auth,
  authUnverify,
} = require("../../middlewares");
const {
  signUp,
  login,
  logout,
  getCurrent,
  verifyEmail,
  resendEmail,
} = require("../../controllers");

const router = express.Router();

router.post("/signup", validateBodyJoi(signupSchema), ctrlWrapper(signUp));

router.post("/login", validateBodyJoi(loginSchema), ctrlWrapper(login));

router.get("/logout", authUnverify, ctrlWrapper(logout));

router.get("/current", auth, ctrlWrapper(getCurrent));

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

router.post("/verify", validateBodyJoi(verifySchema), ctrlWrapper(resendEmail));

module.exports = router;
