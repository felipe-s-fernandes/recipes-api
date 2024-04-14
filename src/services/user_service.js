import userRepository from "../repositories/user_repository.js";
import { NotFoundException } from "../utils/exceptions.js";

class UserService {
  async getUsers() {
    try {
      return await userRepository.getUsers();
    } catch (exception) {
      throw exception;
    }
  }

  async getUserById(userId) {
    try {
      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (exception) {
      throw exception;
    }
  }

  async createUser({ userName }) {
    try {
      const createdUser = await userRepository.createUser({ userName });

      return createdUser;
    } catch (exception) {
      throw exception;
    }
  }

  async updateUser({ userId, userName }) {
    try {
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

  async deleteUserById(userId) {
    try {
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
