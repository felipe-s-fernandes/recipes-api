import recipeRepository from "../repositories/recipe_repository.js";
import userRepository from "../repositories/user_repository.js";
import { NotFoundException } from "../utils/exceptions.js";

class RecipeService {
  async getRecipes() {
    try {
      return await recipeRepository.getRecipes();
    } catch (exception) {
      throw exception;
    }
  }

  async getRecipesByUserId(recipeUserId) {
    try {
      const recipeUser = await userRepository.getUserById(recipeUserId);

      if (!recipeUser) {
        throw new NotFoundException("User not found");
      }

      const recipes = await recipeRepository.getRecipesByUserId(recipeUserId);

      return recipes;
    } catch (exception) {
      throw exception;
    }
  }

  async createRecipe({ recipeUserId, recipeTitle, recipeDescription }) {
    try {
      const recipeUser = await userRepository.getUserById(recipeUserId);

      if (!recipeUser) {
        throw new NotFoundException("User not found");
      }

      const createdRecipe = await recipeRepository.createRecipe({
        recipeUserId,
        recipeTitle,
        recipeDescription,
      });

      return createdRecipe;
    } catch (exception) {
      throw exception;
    }
  }
}

const recipeService = new RecipeService();

export default recipeService;
