const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const schema = require("./schema.js");

const controller = require("./controller.js");

router.get("/weather", controller.getSunriseSunsetData);

module.exports = router;
