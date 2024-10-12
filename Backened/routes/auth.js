const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();

const JWT_SECRET = "harryisab$oy";

//create a user using Post-> localhost:5000/api/auth/createuser
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    let success = false;
    //return bad request when there is an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      //check if the user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exists" });
      }
      //creating a hash and adding salt to secure user's password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating user and saving in mongodb database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//creating login using Post-> localhost:5000/api/auth/login
router.post(
  "/login",
  [
    body("email", "email or password do not match").isEmail(),
    body("password", "email or password do not match").exists(),
  ],
  async (req, res) => {
    let success = false;
    //return bad request when there is an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user with this email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success,error: "invalid credentials" });
      }

      // Compare the password with the hashed password stored in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success,error: "invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//ROUTE 3:Get loggedin User Details using:POST-> localhost:5000/api/auth/getuser
router.post("/getuser", fetchUser, async (req, res) => {
  //return bad request when there is an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal Server Error");
  }
});

module.exports = router;
