const { login } = require("../controllers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const jest = require("jest");

const app = require("../app");
const mongoose = require("mongoose");
const { User } = require("../models/users");

const { TEST_DB_HOST, PORT = 3000 } = process.env;

const user = {
  email: "ttt@ttt.com",
  password: "111111",
};

let userDB = {};

jest.setTimeout(30000);

describe("login controller test", () => {
  beforeAll((done) => {
    mongoose
      .connect(TEST_DB_HOST)
      .then(() =>
        app.listen(PORT, () => {
          console.log(`Database connection successful on port ${PORT}`);
        })
      )
      .catch((error) => {
        console.log(`Database connection was failed. ${error.message}`);
        process.exit(1);
      })
      .then(async () => {
        userDB = await User.create(user);
        console.log(userDB);
      })
      .then(() => done());
  });

  test("test-case login controller", async (done) => {
    const req = {
      body: user,
      user: userDB,
    };
    let res = {};
    await login(req, res);
    console.log(res);
    expect(res.statusCode).toBe(200);
    done();
  });

  afterAll((done) => {
    app.listen().close();

    mongoose.connection.close(() => done());
  });
});
