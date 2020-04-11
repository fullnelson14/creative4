const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const heroSchema = new mongoose.Schema({
  name: String,
  strength: Number,
  speed: Number,
  agility: Number,
});

const Hero = mongoose.model("Hero", heroSchema);

/* API Endpoints */

// create a new user
router.post("/", async (req, res) => {
  try {
    //  Check to see if username already exists and if not send a 403 error. A 403
    // error means permission denied.
    const existingHero = await Hero.findOne({
      name: req.body.name,
    });
    if (existingHero)
      return res.status(403).send({
        message: "That hero already exists",
      });

    // create a new user and save it to the database
    const hero = new Hero({
      name: req.body.name,
      strength: req.body.strength,
      speed: req.body.speed,
      agility: req.body.agility,
    });
    await hero.save();

    // send back a 200 OK response, along with the user that was created
    return res.send({
      hero,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    let hero = await Hero.findOne({ _id: req.body.id });
    let body = req.body;
    hero.name = body.name;
    hero.strength = body.strength;
    hero.speed = body.speed;
    hero.agility = body.agility;
    await hero.save();
    res.send(hero);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allHeros = await Hero.find();
    res.send({
      allHeros,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/", async (req, res) => {
  try {
    await Hero.deleteOne({ _id: req.body.id });

    res.status(200).send({ message: "Success, hero is banished" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Hero,
};
