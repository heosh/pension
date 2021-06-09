"use strict";

const { render } = require("ejs");
const roomController = require("../controllers/roomController");
const router = require("express").Router();


router.get("/", (req, res) => {
    console.log("booking in");
    res.render('booking/main');
  });

module.exports = router;