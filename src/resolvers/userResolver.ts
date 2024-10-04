import User from "../entities/User.js";
import { AppDataSource } from "../data-source.js";
import { UserService } from "../services/userService.js";

type UserData = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);

export const userResolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await userService.getAllUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users.");
      }
    },
    getUser: async (_: any, { id }: { id: number }) => {
      try {
        return await userService.getUserById(id);
      } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw new Error("Failed to fetch user.");
      }
    },
  },
  Mutation: {
    createUser: async (_: any, { firstName, lastName, age, email }: UserData) => {
      try {
        return await userService.createUser({ firstName, lastName, age, email });
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user.");
      }
    },
    updateUser: async ({ id, ...userData }: { id: number } & UserData) => {
      try {
        return await userService.updateUser(id, userData);
      } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw new Error("Failed to update user.");
      }
    },
  },
};
