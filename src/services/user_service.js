import userRepository from "../repositories/user_repository.js";
import { BadRequestException, NotFoundException } from "../utils/exceptions.js";

class UserService {
  async getUsers() {
    try {
      return await userRepository.getUsers();
    } catch (exception) {
      throw exception;
    }
  }

  async getUserById(id) {
    try {
      const userId = Number(id ?? NaN);

      if (isNaN(userId)) {
        throw new BadRequestException("User id must be a number");
      }

      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (exception) {
      throw exception;
    }
  }

  async createUser({ name }) {
    try {
      const userName = String(name ?? "");

      if (userName.length === 0) {
        throw new BadRequestException("User name must be a non-empty string");
      }

      const createdUser = await userRepository.createUser({ userName });

      return createdUser;
    } catch (exception) {
      throw exception;
    }
  }

  async updateUser({ id, name }) {
    try {
      const userId = Number(id ?? NaN);
      const userName = String(name ?? "");

      if (isNaN(userId)) {
        throw new BadRequestException("User id must be a number");
      }

      if (userName.length === 0) {
        throw new BadRequestException("User name must be a non-empty string");
      }

      const userToUpdate = await userRepository.getUserById(userId);

      if (!userToUpdate) {
        throw new NotFoundException("User not found");
      }

      const updatedUser = await userRepository.updateUser({ userId, userName });

      return updatedUser;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteUserById(id) {
    try {
      const userId = Number(id ?? NaN);

      if (isNaN(userId)) {
        throw new BadRequestException("User id must be a number");
      }

      const userToDelete = await userRepository.getUserById(userId);

      if (!userToDelete) {
        throw new NotFoundException("User not found");
      }

      const deletedUser = await userRepository.deleteUserById(userId);

      return deletedUser;
    } catch (exception) {
      throw exception;
    }
  }
}

const userService = new UserService();

export default userService;
