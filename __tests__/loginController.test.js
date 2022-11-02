const { login } = require("../controllers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("login controller test", () => {
  test("response status code = 200", async () => {
    const secret = process.env.SECRET_JWT;
    const password = "123123";
    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const req = { body: { email: "example@mail.com", password: password } };
    const res = {};
    const userDB = { _id: "1", email: "example@mail.com", password: hashPass };

    // const token = jwt.sign({ _id: userDB._id }, secret, { expiresIn: "1h" });

    // const User = {
    //   findByIdAndUpdate: jest.fn(),
    //   findOne: jest.fn().mockImplementationOnce(() => userDB),
    // };

    // jest.spyOn(User, "findOne").mockImplementationOnce(async () => userDB);
    expect(async () => {
      await login(req, res);
    }).toBe(200);
  });
});
