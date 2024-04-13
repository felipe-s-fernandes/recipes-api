import recipeService from "../services/recipe_service.js";
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

  async getRecipeByUserId(req, res) {
    try {
      const userId = req.params.user_id;

      const recipes = await recipeService.getRecipeByUserId(userId);

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
      const userId = req.body.user_id;
      const title = req.body.title;
      const description = req.body.description;

      const createdRecipe = await recipeService.createRecipe({
        userId,
        title,
        description,
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
}

const recipeController = new RecipeController();

export default recipeController;
