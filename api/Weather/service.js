const WeatherData = require("./index");

// Function to fetch weather data from a third-party API
const addWeatherData = async (params) => {
  const data = await WeatherData.create({ ...params });
  return data;
};

const find = async () => {
  const data = await WeatherData.find();
  return data;
};

const getSunriseSet = async (_id) => {
  const data = await WeatherData.findById(_id);
  return data;
};

module.exports = { addWeatherData, find, getSunriseSet };
