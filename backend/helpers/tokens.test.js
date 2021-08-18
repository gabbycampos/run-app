const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("createToken", function () {
  test("works: user", function () {
    const token = createToken({ username: "testuser", is_admin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "testuser"
    });
  });

});
