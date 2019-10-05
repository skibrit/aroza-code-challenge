const express = require("express");
const router = express.Router();
const authMiddlewear = require("../middlewears/authMiddlewear");
const { check, validationResult } = require("express-validator");
const Movies = require("../models/Movie");
const { isValidDate } = require("../utills/validator");

// @ROUTE : GET api/movies
// @DESC  : This route returns all the movies in the database
// @Access : Private
router.get("/", authMiddlewear, async (req, res) => {
  try {
    let actors = await Movies.find();
    res.json(actors);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @ROUTE : GET api/movies/:id
// @DESC  : This route returns a single movie based on the id
// @Access : Private
router.get("/:id", authMiddlewear, async (req, res) => {
  try {
    let actor = await Movies.findById(req.params.id);
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
  check("title", "Title is required").not().isEmpty(),
  check("year", "Year is required").not().isEmpty(),
  check("rating", "Rating needs to be valid number").isNumeric(),
  check("actors.*.name", "Actors Name is required").not().isEmpty(),
  check("actors.*.birthday", "Actors Birthday is required").custom(value => {
    if (isValidDate(value)) return true;
    throw "Valid date is required for birthday";
  }),
  check("actors.*.country", "Actors Country is required").not().isEmpty()
];

// @ROUTE : POST api/movies/
// @DESC  : This route will movie to the database
// @Access : Private
router.post("/", [authMiddlewear, validationRules], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, year, rating, actors } = req.body;
  try {
    const movie = new Movies({ title, year, rating, actors });
    movie.save();
    res.json(movie);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @ROUTE : DELETE api/movies/:id
// @DESC  : This route will delete a movie from the database
// @Access : Private
router.delete("/:id", authMiddlewear, async (req, res) => {
  try {
    await Movies.findOneAndDelete({ _id: req.params.id });
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
