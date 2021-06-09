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

UserSchema.statics.findByCredentials = async function (email, plainPW) {
  if (email && plainPW) {
    const user = await this.findOne({ email });

    if (user) {
      isMatch = (await plainPW) == user.password;

      if (isMatch) return user;
      else console.log("Passord incorrect");
    } else {
      console.log("No user with this credentials");
    }
  }
};

module.exports = model("User", UserSchema);
