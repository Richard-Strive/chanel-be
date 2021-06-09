const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  phoneNumber: {
    type: Number,
    required: true,
  },
  locationOfRecidence: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: { type: Array, required: false },
  favProd: { type: Array, required: false },
});

module.exports = model("User", UserSchema);
