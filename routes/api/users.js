const express = require("express");
const { updateSubscr, updateAvatar } = require("../../controllers");
const {
  ctrlWrapper,
  auth,
  validateBodyJoi,
  uploadMulter,
} = require("../../middlewares");
const { updSubscrSchema } = require("../../models/users");
const fs = require("fs/promises");
const path = require("path");

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
  // multerErrorHandler,
  ctrlWrapper(updateAvatar)
);

module.exports = router;

// async function multerErrorHandler(err, req, res, next) {
//   // console.log("err", err);
//   // console.log("request in multer error handler", req);
//   // console.log("arg3", arg3);
//   // console.log("arg4", arg4);
//   console.log("multer error handler");
//   // const filename = req.file.originalname;
//   // console.log(req.file.originalname);
//   try {
//     console.log(
//       "delete path",
//       path.join(__dirname, "../../uploads", req.file.originalname)
//     );
//     await fs.unlink(
//       path.join(__dirname, "../../uploads", req.file.originalname)
//     );
//   } catch (error) {
//     console.log("error in catch", error);
//   } finally {
//     next(err);
//   }
// }
