const express = require("express");
const { addSchema, patchSchema, favSchema } = require("../../models/contacts");
const validateBodyJoi = require("../../middlewares/validateJoi");
const {
  getAllController,
  getByIdController,
  postController,
  putController,
  deleteController,
  patchController,
} = require("../../controllers");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", getAllController);

router.get("/:contactId", isValidId, getByIdController);

router.post("/", validateBodyJoi(addSchema), postController);

router.delete("/:contactId", isValidId, deleteController);

router.put(
  "/:contactId",
  isValidId,
  validateBodyJoi(patchSchema),
  putController
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyJoi(favSchema),
  patchController
);

module.exports = router;
