const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
// const { Schema } = mongoose;
const User = require("../models/User");

const { body, validationResult } = require("express-validator");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var jwtSecret = "iNoteb@@k";
var fetchUser = require("../middleware/fetchUser")

router.post(
  "/createUser",
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    // Hanling errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if user already exists
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        console.log("A User already exists with this email");
        res
          .status(400)
          .json({ errors: "A User already exists with this email",status:false });
      } else {
        // hash the salted password
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const uobj = await User.create(req.body);

        const data = {
          user: {
            id: uobj.id,
          },
        };
        // send jwt token for authentication
        const authToken = jwt.sign(data, jwtSecret);
        console.log("User created");
        console.log({ user: uobj });
        res.status(200).json({ authToken,status:true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Internal server error!!!",status:false });
    }
  }
);

router.post("/login", body("email").isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Please login with correct credentials!!!");
      res
        .status(400)
        .json({ errors: "Please login with correct credentials!!!",status:false });
    } else {
      comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        const data = {
          user: {
            id: user.id,
          },
        };
        // send jwt token for authentication
        const authToken = jwt.sign(data, jwtSecret);
        console.log("Login Successful!!!");
        res.status(200).json({authToken,status:true});
      } else {
        console.log("Please login with correct credentials!!!");
        res
          .status(400)
          .json({ errors: "Please login with correct credentials!!!",status:false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error!!!",status:false });
  }
});


router.post("/getUser",fetchUser, async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  try{
    // console.log(req.user.id)
    const id =req.user.id
    const user = await User.findById(id).select("-password")
    res.status(200).send({user});
  }
  catch(error){
    res.status(500).send({ msg: "Internal server error!!!" });
  }
  // res.send({error:"error"})

});
module.exports = router;
