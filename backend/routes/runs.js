"use strict";

// Routes for users

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Run = require("../models/run");

const router = new express.Router();

router.get("/", async function (req, res, next) {
    try {
      const runs = await Run.findAll();
      return res.json({ runs });
    } catch (error) {
      return next(err);
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

router.delete("/:id", ensureLoggedIn, async function(req, res,next) {
    try {
        await run.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch(err) {
        return next(err);
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

module.exports = router;