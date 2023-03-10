const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");

const app = express();

const corsOptions = {
  origin: "https://tetianadoroshko.github.io",
  optionsSuccessStatus: 200,
};

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API works" });
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database connection successful on port ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(`Database connection was failed. ${error.message}`);
    process.exit(1);
  });
