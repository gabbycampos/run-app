"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

// Related functions for runs

class Run {
    static async create({ id, userId, distance, avgPace, duration, map }) {
        const duplicateCheck = await db.query(
            `SELECT id
            FROM runs
            WHERE id = $1`,
        [id]);

    if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate run: ${id}`);

    const result = await db.query(
        `INSERT INTO runs
        (id, user_id, distance, average_pace, duration, map)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, user_id AS "userId", distance, average_pace AS "avgPace", duration, map`,
    [id, userId, distance, avgPace, duration, map]);

    const run = result.rows[0];

    return run;
    }

    // get a users run
    static async get(userId) {
        const runRes = await db.query(
            `SELECT id,
                user_id AS "userId",
                distance, average_pace AS "avgPace", duration, map
            FROM runs
            WHERE user_id = $1`, [userId]
        );
        if (!runRes) throw new BadRequestError('Unable to find run');

        const run = runRes.rows[0]

        return run;
    }
}

module.exports = Run;
