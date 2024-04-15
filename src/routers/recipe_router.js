import express from "express";
import recipeController from "../controllers/recipe_controller.js";

const recipeRouter = express.Router();

recipeRouter.get("/", recipeController.getRecipes);
recipeRouter.get("/user/:id", recipeController.getRecipesByUserId);

recipeRouter.post("/", recipeController.createRecipe);

recipeRouter.put("/:id", recipeController.updateRecipeById);

recipeRouter.delete("/:id", recipeController.deleteRecipeById);

export default recipeRouter;
