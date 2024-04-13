import database from "../database/database.js";
import User from "../entities/user_entity.js";
import { InternalServerException } from "../utils/exceptions.js";

class UserRepository {
  async getUsers() {
    try {
      const results = await database.executeQuery({
        query: `SELECT * from users`,
      });

      const users = results.map((result) => {
        return new User({ id: result.id, name: result.name });
      });

      return users ?? [];
    } catch (error) {
      console.error(`UserRepository::getUsers error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getUserById(userId) {
    try {
      const result = await database.executeQuery({
        query: "SELECT * from users where id = $1",
        args: [userId],
      });

      if (result.length === 0) {
        return null;
      }

      const user = new User({
        id: result[0].id,
        name: result[0].name,
      });

      return user;
    } catch (error) {
      console.error(`UserRepository::getUserById error [${error}]`);
      throw new InternalServerException();
    }
  }

  async createUser({ userName }) {
    try {
      const result = await database.executeQuery({
        query: "INSERT INTO users(name) VALUES ($1) RETURNING *",
        args: [userName],
      });

      const createdUser = new User({
        id: result[0].id,
        name: result[0].name,
      });

      return createdUser;
    } catch (error) {
      console.error(`UserRepository::createUser error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateUser({ userId, userName }) {
    try {
      const result = await database.executeQuery({
        query: "UPDATE users SET name = $2 WHERE id = $1 RETURNING *",
        args: [userId, userName],
      });

      const updatedUser = new User({
        id: result[0].id,
        name: result[0].name,
      });

      return updatedUser;
    } catch (error) {
      console.error(`UserRepository::updateUser error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteUserById(userId) {
    try {
      const result = await database.executeQuery({
        query: "DELETE FROM users WHERE id = $1 RETURNING *",
        args: [userId],
      });

      const user = new User({
        id: result[0].id,
        name: result[0].name,
      });

      return user;
    } catch (error) {
      console.error(`UserRepository::deleteUserById error [${error}]`);
      throw new InternalServerException();
    }
  }
}

const userRepository = new UserRepository();

export default userRepository;
