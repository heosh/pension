"use strict";

const { render } = require("ejs");
const roomController = require("../controllers/roomController");
const router = require("express").Router();


router.get("/", roomController.index);
router.get("/:id", roomController.show);
router.post("/create", roomController.create, roomController.redirectView);
router.post("/delete", roomController.delete, roomController.redirectView);
router.post("/update", roomController.update, roomController.redirectView);

module.exports = router;