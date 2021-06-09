"use strict";

const router = require("express").Router(),
  roomRoutes = require("./roomRoutes"),
  bookingRoutes = require("./bookingRoutes"),
  loginRoutes = require("./loginRoutes"),
  boardRoutes = require("./boardRoutes"),
  errorRoutes = require("./errorRoutes").get;


router.get("/", (req, res) => {
  console.log("get in");
  console.log("현재 userId:",req.session.userId);
  res.render('index',{userId : req.session.userId});
});

router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

router.use("/room", roomRoutes);
router.use("/booking", bookingRoutes);
router.use("/login",loginRoutes);
router.use("/board",boardRoutes);
router.use("/", errorRoutes);


module.exports = router;
