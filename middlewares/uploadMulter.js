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
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image") {
      cb(new RequestError(400, "You could upload images only"));
    }
    cb(null, true);
  },
});

const uploadMulter = multer({ storage: multerConfig });

module.exports = uploadMulter;
