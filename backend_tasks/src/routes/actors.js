const express = require("express");
const router = express.Router();
const Actors = require("../models/Actor");
const { check, validationResult } = require("express-validator");
const { isValidDate } = require("../utills/validator");

// @ROUTE : api/actors
// @DESC  : This route returns all the actors in the database
// @Access : Public
router.get("/", async (req, res) => {
  try {
    let actors = await Actors.find();
    res.json(actors);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @ROUTE : api/actors/:id
// @DESC  : This route returns a single actor based on the id
// @Access : Public
router.get("/:id", async (req, res) => {
  try {
    let actor = await Actors.findById(req.params.id);
    if (!actor) {
      return res.status(404).send("Not found");
    }
    res.json(actor);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).send("Not found");
    }
    return res.status(500).send("Server error");
  }
});

// @Validation Rules
const validationRules = [
  check("name", "Name is required").not().isEmpty(),
  check("birthday").custom(value => {
    if (isValidDate(value)) return true;
    throw "A valid date is required";
  }),
  check("country", "Country is required").not().isEmpty()
];

// @ROUTE : api/actors
// @DESC  : This route add actor in the database
// @Access : Public
router.post("/", validationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, birthday, country } = req.body;
  try {
    const actor = new Actors({ name, birthday, country });
    actor.save();
    res.json(actor);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @ROUTE : api/actors
// @DESC  : This route delete an actor from database
// @Access : Public
router.delete("/:id", async (req, res) => {
  try {
    await Actors.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "Delete successful" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).send("Not found");
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
