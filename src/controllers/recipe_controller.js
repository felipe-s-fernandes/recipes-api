import recipeService from "../services/recipe_service.js";
import { BadRequestException } from "../utils/exceptions.js";
import HttpResponse from "../utils/http_response.js";

class RecipeController {
  async getRecipes(req, res) {
    try {
      const recipes = await recipeService.getRecipes();

      const response = new HttpResponse({
        statusCode: 200,
        data: recipes,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getRecipesByUserId(req, res) {
    try {
      const recipeUserId = Number(req.params.id ?? NaN);

      if (isNaN(recipeUserId)) {
        throw new BadRequestException("User id must be a number");
      }

      const recipes = await recipeService.getRecipesByUserId(recipeUserId);

      const response = new HttpResponse({
        statusCode: 200,
        data: recipes,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createRecipe(req, res) {
    try {
      const recipeUserId = Number(req.body.user_id ?? NaN);
      const recipeTitle = String(req.body.title ?? "");
      const recipeDescription = String(req.body.description ?? "");

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
          "Recipe description must be a non-empty string",
        );
      }

      const createdRecipe = await recipeService.createRecipe({
        recipeUserId,
        recipeTitle,
        recipeDescription,
      });

      const response = new HttpResponse({
        statusCode: 200,
        data: createdRecipe,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateRecipeById(req, res) {
    try {
      const recipeId = Number(req.params.id ?? NaN);
      const recipeTitle = String(req.body.title ?? "");
      const recipeDescription = String(req.body.description ?? "");

      if (isNaN(recipeId)) {
        throw new BadRequestException("Recipe id must be a number");
      }

      if (recipeTitle.length === 0) {
        throw new BadRequestException(
          "Recipe title must be a non-empty string",
        );
      }

      if (recipeDescription.length === 0) {
        throw new BadRequestException(
          "Recipe description must be a non-empty string",
        );
      }

      const updatedRecipe = await recipeService.updateRecipe({
        recipeId,
        recipeTitle,
        recipeDescription,
      });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedRecipe,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteRecipeById(req, res) {
    try {
      const recipeId = Number(req.params.id ?? NaN);

      if (isNaN(recipeId)) {
        throw new BadRequestException("Recipe id must be a number");
      }

      const deletedRecipe = await recipeService.deleteRecipeById(recipeId);

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedRecipe,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}

const recipeController = new RecipeController();

export default recipeController;
