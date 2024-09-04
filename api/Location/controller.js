const weatherService = require("../Weather/controller");
const service = require("./service");
const sendMail = require("../../system/sendmail/index");
const moment = require("moment-timezone");
const cron = require("node-cron");

const addLocation = async (req, res) => {
  const { latitude, longitude, name, email } = req.body;
  const weatherData = await weatherService.createWeatherData({
    latitude,
    longitude,
  });

  const newLocation = await service.addLocation({
    name,
    email,
    latitude,
    longitude,
    weatherData: weatherData?._id,
  });
  return res
    .status(200)
    .json({ message: "New Location Data Addede", data: newLocation });
};

const getSunrise = async (req, res) => {
  const { latitude, longitude, email } = req.body;
  const locationData = await service.findOne({
    latitude,
    longitude,
    email,
  });

  const data = await weatherService.getSunriseSet(locationData.weatherData);
  return res.status(200).json({ message: "Get Sunrise/Set Data", data });
};

const getAllSunrise = async (req, res) => {
  const { latitude, longitude, email } = req.body;
  const locationData = await service.findOne({
    latitude,
    longitude,
    email,
  });

  const data = await weatherService.getAllSunriseSet(locationData.weatherData);
  return res.status(200).json({ message: "Get All Sunrise/Set Data", data });
};

const getMessage = (msg) => {
  console.log("msg11111====>>>", msg);
};

const sendMessages = async () => {
  const userData = await service.find();

  userData.forEach(async (user) => {
    const sunriseSetData = await weatherService.getSunriseSetTime(
      user.weatherData
    );
    console.log("Get Sunrise/Set Data====>>>", sunriseSetData);

    scheduleCronJob(
      sunriseSetData.time.sunrise,
      sunriseSetData.timeZone,
      () =>
        getMessage(
          `Hi\n${user.name},\nGood Morning\n${sunriseSetData.time.sunrise}`
        ) // await sendMail(user.email, `Hi ${user.name},\nGood Morning`)
    );
    scheduleCronJob(
      "01:30 PM",
      sunriseSetData.timeZone,
      () => getMessage(`Hi\n${user.name},\nGood Afternoon`)
      // await sendMail(user.email, `Hi ${user.name},\nGood Afternoon`)
    );
    scheduleCronJob(
      sunriseSetData.time.sunset,
      sunriseSetData.timeZone,
      () => getMessage(`Hi\n${user.name},\nGood Evening`)
      // await sendMail(user.email, `Hi ${user.name},\nGood Evening`)
    );

    return;
  });
};

function scheduleCronJob(time, timezone, job) {
  const timeIn24HourFormat = moment
    .tz(time, "hh:mm A", timezone)
    .format("HH:mm");

  const [hour, minute] = timeIn24HourFormat.split(":");

  const cronExpression = `${minute} ${hour} * * *`;

  cron.schedule(cronExpression, job, {
    timezone: timezone,
  });

  console.log(`Cron job scheduled to run every day at ${time} (${timezone})`);
}

module.exports = { addLocation, getSunrise, getAllSunrise, sendMessages };
