const { login } = require("../controllers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const { SECRET_JWT: secret } = process.env;

describe("login controller test", () => {
  const testUser = {
    email: "ttt@ttt.com",
    password: "111111",
  };

  const req = {
    body: testUser,
  };
  const res = {
    json: jest.fn((data) => data),
    status: jest.fn().mockReturnThis(),
  };

  jest.spyOn(User, "findOne").mockImplementation(() => ({
    _id: "1111",
    email: testUser.email,
    subscription: "starter",
    password: bcrypt.hashSync(testUser.password, bcrypt.genSaltSync(10)),
    verify: true,
  }));

  jest.spyOn(User, "findByIdAndUpdate").mockReturnThis();

  test("responses with status-code 200 ", async () => {
    await login(req, res);
    const result = res.status.mock.calls[0][0];
    expect(result).toBe(200);
  });

  test("response contains token ", async () => {
    const testToken = jwt.sign({ _id: "1111" }, secret, { expiresIn: "1h" });
    await login(req, res);
    const result = res.json.mock.results[0].value;
    expect(result.token).toBe(testToken);
  });

  test("response return user={email, password} string type ", async () => {
    await login(req, res);
    const result = res.json.mock.results[0].value;
    expect(typeof result.user.email).toBe("string");
  });
});
