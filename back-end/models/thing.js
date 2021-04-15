const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const sauceVerif = require("../middlewares/sauce-verif");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");

const thingSchema = mongoose.Schema({
  name: { type: String, required: true, validate: sauceVerif.nameChecker },
  manufacturer: {
    type: String,
    required: true,
    validate: sauceVerif.manufacturerChecker,
  },
  description: {
    type: String,
    required: true,
    validate: sauceVerif.descriptionChecker,
  },
  heat: { type: Number, required: true, validate: sauceVerif.heatChecker },
  imageUrl: { type: String, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  mainPepper: {
    type: String,
    required: true,
    validate: sauceVerif.ingredientChecker,
  },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  userId: { type: String, required: true },
});

thingSchema.plugin(sanitizerPlugin);
module.exports = mongoose.model("Thing", thingSchema);
