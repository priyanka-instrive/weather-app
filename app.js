const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const middlewareConfig = require("./system/middleware.js/config");
const { default: mongoose } = require("mongoose");
const route = require("./api/Location/route");
const { sendMessages } = require("./api/Location/controller");
const { updateWeatherData } = require("./api/Weather/controller");
const cron = require("node-cron");

if (process.env.NODE_ENV === "local") {
  require("dotenv").config({
    path: `./${process.env.NODE_ENV}.env`,
  });
} else {
  require("dotenv").config({
    path: `./local.env`,
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(middlewareConfig.cors));
app.use(helmet());
app.use(morgan(middlewareConfig.morganRequestFormat));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//public route
app.get("/", () => {
  res.send("hello world");
});

mongoose
  .connect(
    `${process.env.MONGO_CONN_STRING}${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_AUTH_SOURCE}`
  )
  .then(() => console.log("mongoose connected successfully"))
  .catch((err) => err);

app.use("/", route);

//schedule message every mid night
cron.schedule("0 0 * * *", sendMessages, {
  timezone: "Asia/Kolkata", // IST timezone
});

//update weather Data Every mid night
cron.schedule("0 0 * * *", updateWeatherData, {
  timezone: "Asia/Kolkata", // IST timezone
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Server is running port" + (process.env.PORT || 4000));
});
