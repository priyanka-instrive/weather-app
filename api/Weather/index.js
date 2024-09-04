const mongoose = require("mongoose");

const weatherDataSchema = new mongoose.Schema(
  {
    location: {
      type: Object,
    },
    forecastday: {
      type: Array,
    },
  },
  { timestamps: true }
);

const WeatherData = mongoose.model("WeatherData", weatherDataSchema);
module.exports = WeatherData;
