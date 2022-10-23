const express = require("express");
const { addSchema, patchSchema, favSchema } = require("../../models/contacts");
const { validateBodyJoi, auth } = require("../../middlewares");
const {
  getAllContact,
  getByIdContact,
  postContact,
  putContact,
  deleteContact,
  patchContact,
} = require("../../controllers");
const {isValidId, ctrlWrapper} = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAllContact));

router.get("/:contactId", auth, isValidId, ctrlWrapper(getByIdContact));

router.post("/", auth, validateBodyJoi(addSchema), ctrlWrapper(postContact));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(deleteContact));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBodyJoi(patchSchema),
  ctrlWrapper(putContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBodyJoi(favSchema),
  ctrlWrapper(patchContact)
);

module.exports = router;
