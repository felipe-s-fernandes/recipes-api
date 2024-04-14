import express from "express";
import recipeController from "../controllers/recipe_controller.js";

const recipeRouter = express.Router();

recipeRouter.get("/", recipeController.getRecipes);
recipeRouter.get("/user/:id", recipeController.getRecipesByUserId);

recipeRouter.post("/", recipeController.createRecipe);

export default recipeRouter;
