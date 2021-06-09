"use strict";

const router = require("express").Router(),
  roomRoutes = require("./roomRoutes"),
  bookingRoutes = require("./bookingRoutes"),
  errorRoutes = require("./errorRoutes").get;


router.get("/", (req, res) => {
  console.log("get in");
  res.render('index');
});

router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

router.use("/room", roomRoutes);
router.use("/booking", bookingRoutes);
router.use("/", errorRoutes);


module.exports = router;
