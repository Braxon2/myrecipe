const express = require("express");

const {
  getRecipes,
  getRecipe,
  deleteRecipe,
  createRecipe,
} = require("../controllers/recipeController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getRecipes);

router.get("/:id", getRecipe);

router.post("/create", createRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
