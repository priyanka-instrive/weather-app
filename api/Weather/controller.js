const moment = require("moment");
const service = require("./service");
const { default: axios } = require("axios");

const createWeatherData = async (location) => {
  const { latitude, longitude } = location;
  const getWeatherDataFromAPI = await getWeatherData(
    `${latitude},${longitude}`
  );
  const data = await service.addWeatherData({
    location: getWeatherDataFromAPI.location,
    forecastday: getWeatherDataFromAPI.forecast.forecastday,
  });
  return data;
};

async function getWeatherData(location) {
  const url = "https://api.weatherapi.com/v1/history.json";
  const apiKey = process.env.WEATHER_API_KEY;
  const endDate = moment().format("YYYY-MM-DD");
  const startDate = moment().subtract(4, "days").format("YYYY-MM-DD"); // Calculate start date 5 days ago

  try {
    const response = await axios.get(url, {
      params: {
        key: apiKey,
        q: location,
        dt: startDate, // Set start date
        end_dt: endDate, // Set end date
      },
    });

    const weatherData = response.data;
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

const updateWeatherData = async () => {
  try {
    const data = await service.find();
    if (data.length === 0) {
      console.log("No weather  data found.");
      return;
    }

    for (let document of data) {
      document.forecastday.shift();
      let newData = await getWeatherData(
        `${document.location.lat},${document.location.lon}`
      );
      newData = newData.forecast.forecastday.pop();

      document.forecastday.push(newData);
      await document.save();
    }

    console.log("All forecasts updated successfully.");
  } catch (error) {
    console.error("Error updating forecasts:", error);
  }
};

const getSunriseSet = async (_id) => {
  const data = await service.getSunriseSet(_id);

  const newData = {
    date: data.forecastday[data.forecastday.length - 1].date,
    time: data.forecastday[data.forecastday.length - 1].astro,
  };
  return newData;
};

const getSunriseSetTime = async (_id) => {
  const data = await service.getSunriseSet(_id);

  const newData = {
    timeZone: data.location.tz_id,
    date: data.forecastday[data.forecastday.length - 1].date,
    time: data.forecastday[data.forecastday.length - 1].astro,
  };
  return newData;
};

const getAllSunriseSet = async (_id) => {
  const data = await service.getSunriseSet(_id);

  const newData = data.forecastday.map((item) => {
    return {
      date: item.date,
      time: item.astro,
    };
  });
  return newData;
};

module.exports = {
  createWeatherData,
  getSunriseSet,
  getAllSunriseSet,
  getSunriseSetTime,
  updateWeatherData,
};
