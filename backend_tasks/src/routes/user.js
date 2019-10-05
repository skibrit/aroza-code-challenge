const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const User = require("../models/User");
const bCrypt = require("bcrypt");
const config = require("config");
const { signToken } = require("../utills/crypto");

// @Validation Rules
let validationRules = [
  check("username", "Username is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty()
];

// @ROUTE : POST api/user/login
// @DESC  : This route allows user to log in
// @Access : Public
router.post("/login", validationRules, async (req, res) => {
  //check if all the validation has been done
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const defaultError = { msg: "Username or password invalid" };
    if (!user) {
      return res.status(400).json({ errors: [defaultError] });
    }
    //check the password by comparing with bCrypt
    const isMatched = await bCrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ errors: [defaultError] });
    }

    //update last login time
    await User.findOneAndUpdate(
      { username },
      { $set: { lastLoginTime: new Date() } },
      { new: true }
    );

    const payload = {
      user: {
        id: user.id
      }
    };
    //sent jwt token to the user
    let token = await signToken(payload, config.get("jwtSecret"), "1000h");

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

validationRules = [
  check("username", "Username is required").not().isEmpty(),
  check(
    "password",
    "Password must be consist of 6 or more character"
  ).isLength({ min: 6 })
];

// @ROUTE : POST api/user/signup
// @DESC  : This route allows user to sign in
// @Access : Public
router.post("/signup", validationRules, async (req, res) => {
  //check if all the validation has been done

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;

  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Username already exist" }] });
    } else {
      const user = new User({ username, password });
      //encrypt the password with bCrypt
      let salt = await bCrypt.genSalt(10);
      user.password = await bCrypt.hash(password.toString(), salt);

      //save data into database
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      //sent jwt token to the registered user
      //sent jwt token to the user
      let token = await signToken(payload, config.get("jwtSecret"), "1000h");
      res.json({ token });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @ROUTE : GET api/user/:username
// @DESC  : This route will return a user detail based on username
// @Access : Public
router.get("/:username", validationRules, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).send("Not found");
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @ROUTE : GET api/user/:username
// @DESC  : This route will return all the user in the database
// @Access : Public
router.get("/", validationRules, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
