"use strict";

// Routes for users

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const router = new express.Router();

// GET /[username] => {user}
// Returns { username, firstName, lastName, underArmourID? }
// Authorization required: same user-as-:username
router.get("/:username", async function(req, res, next) {
    try {
        const users = await User.get(req.params.username);
        return res.json({ users });
    } catch(error) {
        return next(error);
    }
});

// DELETE /[username] => { deleted: username }
// Authoriaation required: same-user-as-:username
router.delete("/:username", ensureCorrectUser, async function(req, res,next) {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch(err) {
        return next(err);
    }
});

module.exports = router;