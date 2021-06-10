const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema");
const { body, validationResult } = require("express-validator");
const route = express.Router();

//Registration
route.post(
  "/register",
  body("email").isEmail().withMessage("this is not a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newUser = new User({
        ...req.body,
      });
      await newUser.save();
      const { _id } = newUser;
      next();
      res.status(201).send(_id);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

//Login
route.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userFound = await User.findByCredentials(email, password);

      if (userFound) {
        res.status(200).send(userFound);
        next();
      } else {
        res.status(400).send("no user found");
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = route;
