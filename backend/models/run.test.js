"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Run = require("./run.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testRunsIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  let newRun = {
    day: '20210801',
    distance: '1.53',
    pace: '13.05',
    duration: '20.01',
    coordinates: '{"data", "data", "data"}'
  };

  test("works", async function () {
    let run = await Run.create(newRun);
    expect(run).toEqual({
      ...newRun,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let runs = await Run.findAll();
    expect(runs).toEqual([
      {
        id: testRunsIds[0],
        day: '20210801',
        distance: '1.53',
        pace: '13.05',
        duration: '20.01',
        coordinates: '{"data", "data", "data"}'
      },
    ]);
  });

});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let run = await Run.get(testRunsIds[0]);
    expect(run).toEqual({
      id: testJobIds[0],
      day: '20210801',
      distance: '1.53',
      pace: '13.05',
      duration: '20.01',
      coordinates: '{"data", "data", "data"}'
    });
  });

  test("not found if no such run", async function () {
    try {
      await Run.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Run.remove(testRunsIds[0]);
    const res = await db.query(
        "SELECT id FROM runs WHERE id=$1", [testRunsIds[0]]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such run", async function () {
    try {
      await Run.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
