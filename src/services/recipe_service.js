import recipeRepository from "../repositories/recipe_repository.js";
import userRepository from "../repositories/user_repository.js";
import { BadRequestException, NotFoundException } from "../utils/exceptions.js";

class RecipeService {
  async getRecipes() {
    try {
      return await recipeRepository.getRecipes();
    } catch (exception) {
      throw exception;
    }
  }

  async getRecipeByUserId(id) {
    try {
      const recipeUserId = Number(id ?? NaN);

      if (isNaN(recipeUserId)) {
        throw new BadRequestException("User id must be a number");
      }

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

  async createRecipe({ userId, title, description }) {
    try {
      const recipeUserId = Number(userId ?? NaN);
      const recipeTitle = String(title ?? "");
      const recipeDescription = String(description ?? "");

      if (isNaN(recipeUserId)) {
        throw new BadRequestException("User id must be a number");
      }

      if (recipeTitle.length === 0) {
        throw new BadRequestException(
          "Recipe title must be a non-empty string",
        );
      }

      if (recipeDescription.length === 0) {
        throw new BadRequestException(
          "Recipe title must be a non-empty string",
        );
      }

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
