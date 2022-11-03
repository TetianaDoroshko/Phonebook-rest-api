const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");
const { fsyncSync } = require("fs");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("express error handler");
  const files = fsSync.readdirSync(path.join(__dirname, "uploads"));
  console.log(files);
  files.forEach((file) => {
    try {
      console.log(file);
      fsSync.unlinkSync(path.join(__dirname, "uploads", file));
      console.log(path.join(__dirname, "uploads", file));
    } catch (error) {
      console.log("catch error", error);
    }
  });
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
