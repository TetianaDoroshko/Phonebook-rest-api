const multer = require("multer");
const path = require("path");
const RequestError = require("../helpers/RequestError");

const tempDir = path.join(__dirname, "../", "uploads");

const multerConfig = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMulter = multer({
  storage: multerConfig,
  limits: { fileSize: 1000000 },
  fileFilter: async (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
      cb(RequestError(400, "You can upload images only"), false);
    } else {
      cb(null, true);
    }
  },
});

module.exports = uploadMulter;
