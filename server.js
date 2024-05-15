require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoute");

const app = express();
app.use(express.json()); //body-parser middleware (built-in middleware)

//custom middleware
const myLogger = function (req, res, next) {
  console.log("Request IP:", req.ip);
  console.log("Request method", req.method);
  console.log("Request date", new Date());

  next();
};

app.use(myLogger);

//third-party middleware
app.use(morgan("tiny"));
app.use("/api/", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
