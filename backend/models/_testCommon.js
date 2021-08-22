const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testRuns = [];

async function commonBeforeAll() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM runs");
  
    await db.query(`
          INSERT INTO users(username,
                            password,
                            first_name,
                            last_name)
          VALUES ('testuser1', $1, 'Test', 'User')`,
        [
          await bcrypt.hash("password", BCRYPT_WORK_FACTOR)
        ]);
  
    const resultsRuns = await db.query(`
        INSERT INTO runs (user_id, 
                            day, 
                            distance, 
                            pace, 
                            duration, 
                            coordinates)
        VALUES ('testuser1', '20210801', '1.53', '13.05', '20.01', '{"data", "data", "data"}')
        RETURNING id`);
    testRuns.splice(0, 0, ...resultsRuns.rows.map(r => r.id));
};
  
async function commonBeforeEach() {
    await db.query("BEGIN");
};
  
async function commonAfterEach() {
    await db.query("ROLLBACK");
};
  
async function commonAfterAll() {
    await db.end();
};


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testRuns
};