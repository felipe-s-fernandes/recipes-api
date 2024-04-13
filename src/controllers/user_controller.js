import userService from "../services/user_service.js";
import { BadRequestException, Exception } from "../utils/exceptions.js";
import HttpResponse from "../utils/http_response.js";

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();

      const response = new HttpResponse({
        statusCode: 200,
        data: users,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;

      const user = await userService.getUserById(id);

      const response = new HttpResponse({
        statusCode: 200,
        data: user,
      });

      res.status(200).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createUser(req, res) {
    try {
      const name = req.body.name;

      const createdUser = await userService.createUser({ name });

      const response = new HttpResponse({
        statusCode: 200,
        data: createdUser,
      });

      res.status(200).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateUserById(req, res) {
    try {
      const id = req.params.id;
      const name = req.body.name;

      const updatedUser = await userService.updateUser({ id, name });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedUser,
      });

      res.status(200).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteUserById(req, res) {
    try {
      const id = req.params.id;

      const deletedUser = await userService.deleteUserById(id);

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedUser,
      });

      res.status(200).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}

const userController = new UserController();

export default userController;
