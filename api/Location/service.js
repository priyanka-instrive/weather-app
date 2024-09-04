const Location = require("./index");

const addLocation = async (data) => {
  const newLocation = await Location.create({
    ...data,
  });
  return newLocation;
};

const getLocations = async () => {
  return await Location.find({});
};

const findOne = async (params) => {
  return await Location.findOne({ ...params });
};

const find = async () => {
  return await Location.find();
};

// const updateWeatherData = async (locationId, weatherData) => {
//   return await Location.findByIdAndUpdate(
//     locationId,
//     { weatherData },
//     { new: true }
//   );
// };

// const deleteOldWeatherData = async (locationId, date) => {
//   return await Location.updateOne(
//     { _id: locationId },
//     { $pull: { weatherData: { date: { $lt: date } } } }
//   );
// };

module.exports = {
  addLocation,
  getLocations,
  // deleteOldWeatherData,
  // updateWeatherData,
  findOne,
  find,
};
