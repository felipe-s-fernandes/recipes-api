import recipeRepository from "../repositories/recipe_repository.js";
import userRepository from "../repositories/user_repository.js";
import { ConflictException, NotFoundException } from "../utils/exceptions.js";

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

      const userRecipes =
        await recipeRepository.getRecipesByUserId(recipeUserId);

      if (userRecipes.length >= 10) {
        throw new ConflictException("User cannot have more than 10 recipes");
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

  async updateRecipe({ recipeId, recipeTitle, recipeDescription }) {
    try {
      const recipeToUpdate = await recipeRepository.getRecipeById(recipeId);

      if (!recipeToUpdate) {
        throw NotFoundException("Recipe not found");
      }

      const updatedRecipe = await recipeRepository.updateRecipe({
        recipeId,
        recipeTitle,
        recipeDescription,
      });

      return updatedRecipe;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteRecipeById(recipeId) {
    try {
      const recipeToDelete = await recipeRepository.getRecipeById(recipeId);

      if (!recipeToDelete) {
        throw new NotFoundException("Recipe not found");
      }

      const deletedRecipe = await recipeRepository.deleteRecipeById(recipeId);

      return deletedRecipe;
    } catch (exception) {
      throw exception;
    }
  }
}

const recipeService = new RecipeService();

export default recipeService;
