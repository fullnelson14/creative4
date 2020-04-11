const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const hero = require("./hero.js");

// setup express
const app = express();

// setup body parser middleware to convert to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// connect to the mongodb database
mongoose.connect("mongodb://localhost:27017/hero-creator", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use("/api/hero", hero.routes);

// listen on port 3000
app.listen(3005, () => console.log("Server listening on port: 3005"));
