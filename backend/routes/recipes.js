const express = require("express");

const {
  getRecipes,
  getRecipe,
  deleteRecipe,
  createRecipe,
} = require("../controllers/recipeController");

const router = express.Router();

router.get("/", getRecipes);

router.get("/:id", getRecipe);

router.post("/", createRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
