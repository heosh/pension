"use strict";

const { render } = require("ejs");
const roomController = require("../controllers/roomController");
const router = require("express").Router();


router.get("/", (req, res, next) => {
    console.log("booking in");
    res.render('booking2/index');

  });

  // router.get("/", (req, res, next) => {
  //   console.log("booking in");
  //   res.render('booking/inquiry');

  // });


module.exports = router;