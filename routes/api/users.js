const express = require("express");
const { getCurrent, updateSubscr } = require("../../controllers");
const { ctrlWrapper, auth, validateBodyJoi } = require("../../middlewares");
const { updSubscrSchema } = require("../../models/users");

const router = express.Router();

router.patch(
  "/",
  auth,
  validateBodyJoi(updSubscrSchema),
  ctrlWrapper(updateSubscr)
);
router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;
