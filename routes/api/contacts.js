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
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", auth, getAllContact);

router.get("/:contactId", isValidId, getByIdContact);

router.post("/", validateBodyJoi(addSchema), postContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, validateBodyJoi(patchSchema), putContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyJoi(favSchema),
  patchContact
);

module.exports = router;
