"use strict";

// Routes for users

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Run = require("../models/run");

const router = new express.Router();

router.get("/:userId", async function (req, res, next) {
    try {
      const runs = await Run.findAll(req.params.userId);
      return res.json({ runs });
    } catch (error) {
      return next(error);
    }
  });


router.get("/:id", async function(req, res, next) {
    try {
        const runs = await Run.get(req.params.id);
        return res.json({ runs });
    } catch(error) {
        return next(error);
    }
});

router.post("/:id", async function(req, res, next) {
    try {
        const run = await Run.create(req.body);
        return res.status(201).json({ run })
    } catch(err) {
        return next(err)
    }
});

router.delete("/:id", async function(req, res,next) {
    try {
        await Run.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch(err) {
        return next(err);
    }
});

module.exports = router;