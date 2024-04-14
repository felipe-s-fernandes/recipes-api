import userService from "../services/user_service.js";
import { BadRequestException } from "../utils/exceptions.js";
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
      const userId = Number(req.params.id ?? NaN);

      if (isNaN(userId)) {
        throw new BadRequestException("User id must be a number");
      }

      const user = await userService.getUserById(userId);

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
      const userName = String(req.body.name ?? "");

      if (userName.length === 0) {
        throw new BadRequestException("User name must be a non-empty string");
      }

      const createdUser = await userService.createUser({ userName });

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
      const userId = Number(req.params.id ?? NaN);
      const userName = String(req.body.name ?? "");

      if (isNaN(userId)) {
        throw new BadRequestException("User id must be a number");
      }

      if (userName.length === 0) {
        throw new BadRequestException("User name must be a non-empty string");
      }

      const updatedUser = await userService.updateUser({ userId, userName });

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
      const userId = Number(req.params.id ?? NaN);

      if (isNaN(userId)) {
        throw new BadRequestException("User id must be a number");
      }

      const deletedUser = await userService.deleteUserById(userId);

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
