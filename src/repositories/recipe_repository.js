import database from "../database/database.js";
import Recipe from "../entities/recipe_entity.js";
import { InternalServerException } from "../utils/exceptions.js";

class RecipeRepository {
  async getRecipes() {
    try {
      const results = await database.executeQuery({
        query: `SELECT * from recipes`,
      });

      const recipes = results.map((result) => {
        return new Recipe({
          id: result.id,
          userId: result.user_id,
          title: result.title,
          description: result.description,
        });
      });

      return recipes ?? [];
    } catch (error) {
      console.error(`RecipeRepository::getRecipes error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getRecipeById(recipeId) {
    try {
      const result = await database.executeQuery({
        query: "SELECT * FROM recipes WHERE id = $1",
        args: [recipeId],
      });

      if (result.length === 0) {
        return null;
      }

      const recipe = new Recipe({
        id: result[0].id,
        userId: result[0].user_id,
        title: result[0].title,
        description: result[0].description,
      });

      return recipe;
    } catch (error) {
      console.error(`RecipeRepository::getRecipeByRecipeId error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getRecipesByUserId(recipeUserId) {
    try {
      const results = await database.executeQuery({
        query: `SELECT * from recipes WHERE user_id = $1`,
        args: [recipeUserId],
      });

      const recipes = results.map((result) => {
        return new Recipe({
          id: result.id,
          userId: result.user_id,
          title: result.title,
          description: result.description,
        });
      });

      return recipes ?? [];
    } catch (error) {
      console.error(`RecipeRepository::getRecipesByUserId error [${error}]`);
      throw new InternalServerException();
    }
  }

  async createRecipe({ recipeUserId, recipeTitle, recipeDescription }) {
    try {
      const result = await database.executeQuery({
        query:
          "INSERT INTO recipes(user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
        args: [recipeUserId, recipeTitle, recipeDescription],
      });

      const createdRecipe = new Recipe({
        id: result[0].id,
        userId: result[0].user_id,
        title: result[0].title,
        description: result[0].description,
      });

      return createdRecipe;
    } catch (error) {
      console.error(`RecipeRepository::createRecipe error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteRecipeById(recipeId) {
    try {
      const result = await database.executeQuery({
        query: "DELETE FROM recipes WHERE id = $1 RETURNING *",
        args: [recipeId],
      });

      const deletedRecipe = new Recipe({
        id: result[0].id,
        userId: result[0].user_id,
        title: result[0].title,
        description: result[0].description,
      });

      return deletedRecipe;
    } catch (error) {
      console.error(`RecipeRepository::deleteRecipeById error [${error}]`);
      throw new InternalServerException();
    }
  }
}

const recipeRepository = new RecipeRepository();

export default recipeRepository;
