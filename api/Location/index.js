const { Schema, default: mongoose } = require("mongoose");
const locationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    weatherData: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema, "Locations");

module.exports = Location;
