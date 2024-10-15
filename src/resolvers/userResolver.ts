import {User} from "../entities/User.js";
import { AppDataSource } from "../data-source.js";
import { UserService } from "../services/userService.js";
import { UserInput, UserUpdates, MutationResponse } from "../types/userTypes.js";

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);

export const userResolvers = {
  Query: {
    getUsers: async (): Promise<User[]> => {
      try {
        return await userService.getAllUsers();
      } catch (error) {
        console.error("Error in getUsers resolver:", error);
        throw new Error("Could not retrieve users. Please try again later.");
      }
    },
    getUser: async (_: any, { id }: { id: number }): Promise<User | null> => {
      try {
        const user = await userService.getUserById(id);
        if (!user) {
          throw new Error(`User with id ${id} not found.`);
        }
        return user;
      } catch (error) {
        console.error(`Error in getUser resolver for id ${id}:`, error);
        throw new Error("Could not retrieve the user. Please check the user ID and try again.");
      }
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }): Promise<MutationResponse> => {
      try {
        const user = await userService.createUser(input);
        return {
          success: true,
          message: "User created successfully.",
          user,
        };
      } catch (error:any) {
        console.error("Error in createUser resolver:", error);
        const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
        const errorMessage = error.message || 'An unexpected error occurred.';
        return {
          success: false,
          message: errorMessage,
          user: null,
          errorCode: errorCode,
          errorDetail: error, // Optionally include the full error object for more details
        };
      }
    },
    updateUser: async (_: any, { id, input }: { id: number; input: UserUpdates }): Promise<MutationResponse> => {
      // Optional: Validate the input here
    
      try {
        const updatedUser = await userService.updateUser(id, input);
        if (!updatedUser) {
          return {
            success: false,
            message: `User with id ${id} not found. Update failed.`,
            user: null,
          };
        }
        return {
          success: true,
          message: "User updated successfully.",
          user: updatedUser,
        };
      } catch (error:any) {
        console.error(`Error in updateUser resolver for id ${id}:`, error); // Log the full error object
    
        // Assuming error has a 'code' and 'message' property
        const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
        const errorMessage = error.message || 'An unexpected error occurred.';
    
        return {
          success: false,
          message: errorMessage,
          user: null,
          errorCode: errorCode,
          errorDetail: error, // Optionally include the full error object for more details
        };
      }
    },
    
    deleteUser: async (_: any, { id }: { id: number }): Promise<MutationResponse> => {
      try {
        const deletedUser = await userService.deleteUser(id);
        return {
          success: true,
          message: `User with id ${id} deleted successfully.`,
          user: deletedUser,
        };
      } catch (error) {
        console.error(`Error in deleteUser resolver for id ${id}:`, error);
        return {
          success: false,
          message: "Could not delete the user. Please check the user ID and try again.",
          user: null,
        };
      }
    },
  },
};
