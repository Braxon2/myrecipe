const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    instruction: { type: String, required: true },
    ingredients: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
