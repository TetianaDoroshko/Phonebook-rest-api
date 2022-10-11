const express = require("express");
const {
  validationAdd,
  validationPatch,
} = require("../../middlewares/validation");

const {
  getAllController,
  getByIdController,
  postController,
  putController,
  deleteController,
} = require("../../controllers");

const router = express.Router();

router.get("/", getAllController);

router.get("/:contactId", getByIdController);

router.post("/", validationAdd, postController);

router.delete("/:contactId", deleteController);

router.put("/:contactId", validationPatch, putController);

module.exports = router;
