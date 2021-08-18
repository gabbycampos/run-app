"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

// Related functions for runs

class Run {
    static async create({ userId, day, distance, pace, duration, coordinates }) {
        const result = await db.query(
            `INSERT INTO runs
        (user_id, day, distance, pace, duration, coordinates)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, user_id AS "userId", day, distance, pace, duration, coordinates`,
            [userId, day, distance, pace, duration, coordinates]);

        const run = result.rows[0];

        return run;
    }

    // get a users run
    static async get(id) {
        const runRes = await db.query(
            `SELECT id,
                user_id AS "userId",
                day, 
                distance, 
                pace, 
                duration,
                coordinates
            FROM runs
            WHERE id = $1`, [id]
        );

        const run = runRes.rows[0]

        if (!runRes) throw new BadRequestError('Unable to find run');

        return run;
    }

    // get a users runs
    static async findAll() {
        const runs = await db.query(
            `SELECT id,
                user_id AS "userId",
                day,
                distance, 
                pace,
                duration,
                coordinates
            FROM runs
            ORDER BY day`);
        return runs.rows;
    }

    // remove a users run
    static async remove(id) {
        const result = await db.query(
            `DELETE
            FROM runs
            WHERE id = $1
            RETURNING id`, [id]);
        const run = result.rows[0];

        if (!run) throw new NotFoundError(`No run: ${id}`);
    }

}

module.exports = Run;
