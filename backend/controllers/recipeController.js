const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
  const user_id = req.user._id;
  const recipes = await Recipe.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  const recipe = await Recipe.findById(id);
  res.status(200).json(recipe);
};

const createRecipe = async (req, res) => {
  const { title, author, instruction, ingredients } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!instruction) {
    emptyFields.push("instruction");
  }
  if (!ingredients || ingredients.length === 0) {
    emptyFields.push("ingredients");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user_id = req.user._id;
    const nameUser = req.user.name;

    const recipe = await Recipe.create({
      title,
      nameUser,
      instruction,
      ingredients,
      user_id,
    });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  const recipe = await Recipe.findByIdAndDelete(id);
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  res.status(200).json(recipe);
};

module.exports = { getRecipes, getRecipe, deleteRecipe, createRecipe };
