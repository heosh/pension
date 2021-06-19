"use strict";

const { render } = require("ejs");
const bookingController = require("../controllers/bookingController");
const router = require("express").Router();


router.get("/", (req, res) => {
    console.log("booking in");
    res.render('booking/main');
  });

router.post("/date", bookingController.seldate);
router.put("/create", bookingController.create, bookingController.redirectView);
router.get("/check", bookingController.check, bookingController.redirectView);
router.delete("/:id/delete", bookingController.delete, bookingController.redirectView);

module.exports = router;
