"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

// Related functions for users

class User {
    // authenticate user with username, password

    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName"
            FROM users
            WHERE username = $1`, [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username/password");
    }

    // Register user with data
    static async register({ username, password, firstName, lastName }) {
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`, [username],
        );
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
                (username, password, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING username, first_name AS "firstName", last_name AS "lastName"`,
            [
                username, hashedPassword, firstName, lastName
            ]
        );

        const user = result.rows[0];
        return user;
    }

    // Return data about a user
    static async get(username) {
        const userRes = await db.query(
            `SELECT username,
                      first_name AS "firstName",
                      last_name AS "lastName"
               FROM users
               WHERE username = $1`,
            [username],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        return user;
    }

    // Delete given user from database
    static async remove(username) {
        let result = await db.query(
            `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`, [username]
        );
        const user = result.rows[0];
        if (!user) throw new NotFoundError(`No user: ${username}`);
    }
}

module.exports = User;