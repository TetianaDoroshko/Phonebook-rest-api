const express = require("express");
const { updateSubscr, updateAvatar } = require("../../controllers");
const {
  ctrlWrapper,
  auth,
  validateBodyJoi,
  uploadMulter,
} = require("../../middlewares");
const { updSubscrSchema } = require("../../models/users");

const router = express.Router();

router.patch(
  "/subscription",
  auth,
  validateBodyJoi(updSubscrSchema),
  ctrlWrapper(updateSubscr)
);

router.patch(
  "/avatar",
  auth,
  uploadMulter.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
