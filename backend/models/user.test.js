const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("../models/user.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon");
  
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("login", function () {
    test("works", async function () {
        const user = await User.login("testuser1", "password");
        expect(user).toEqual({
            username: "testuser1",
            firstName: "Test",
            lastName: "User",
        });
    });
  
    test("unauth if no such user", async function () {
        try {
            await User.login("nope", "password");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
  
    test("unauth if wrong password", async function () {
        try {
            await User.login("testuser1", "wrong");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});


describe("register", function () {
    const newUser = {
        username: "testuser1",
        firstName: "Test",
        lastName: "User"
    };
  
    test("works", async function () {
        let user = await User.register({
            ...newUser,
            password: "password",
        });
        expect(user).toEqual({
            username: "testuser1",
            firstName: "Test",
            lastName: "User"
        });
        const found = await db.query("SELECT * FROM users WHERE username = 'testuser1'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].hashed_pwd.startsWith("$2b$")).toEqual(true);
    });
  
    test("bad request with dup data", async function () {
        try {
            await User.register({
            ...newUser,
            password: "password",
            });
            await User.register({
            ...newUser,
            password: "password",
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});


describe("get", function () {
    test("works", async function () {
        let user = await User.get("testuser");
        expect(user).toEqual({
            username: "testuser1",
            firstName: "Test",
            lastName: "User"
        });
    });
  
    test("not found if no such user", async function () {
        try {
            await User.get("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
