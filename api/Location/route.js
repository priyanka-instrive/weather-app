const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const schema = require("./schema.js");

const controller = require("./controller.js");

router.post(
  "/location",
  celebrate(schema.locationValidationSchema, schema.options),
  controller.addLocation
);

router.get("/get_sunset", controller.getSunrise);
router.get("/get_all_sunset", controller.getAllSunrise);
module.exports = router;
