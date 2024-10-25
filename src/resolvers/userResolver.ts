import {User} from "../entities/User.js";
import { services } from "../services/index.js";
import { UserInput, UserUpdates, UserMutationResponse, UserQueryResponse } from "../types/userTypes.js";

export const userResolvers = {
  Query: {
    getUsers: async (): Promise<UserQueryResponse | null> => {
      try {
				const UsersResult = await services.userService.getAllUsers()
				if (!UsersResult) {
					return {
						success: false,
						message: "no users found",
						users: null
					}
				}
				return {
					success: true,
					message: " users found",
					users:UsersResult
				};

			} catch (error) {
				console.error("Error in getUsers resolver:", error);
				throw new Error("Could not retrieve users. Please try again later.");
			}
    },
    getUser: async (_: any, { id }: { id: number }): Promise<UserQueryResponse | null> => {
      try {
				const UserResult = await services.userService.getUserById(id);
				if (UserResult) {
					return {
						success: true,
						message: "user fetch successfully.",
						user: UserResult,
					}
				}
				return {
					success: false,
					message: `No user for user id ${id} in the DB`,
					user: null
				};
			} catch (error) {
				console.error(`Error in getEvent resolver for id ${id}:`, error);
				throw new Error("Could not retrieve the event. Please check the user ID and try again.");
			}
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }): Promise<UserMutationResponse> => {
      try {
        const user = await services.userService.createUser(input);
        return {
          success: true,
          message: "User created successfully.",
          singleUser:user
        };
      } catch (error:any) {
        console.error("Error in createUser resolver:", error);
        const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
        const errorMessage = error.message || 'An unexpected error occurred.';
        return {
          success: false,
          message: errorMessage,
          singleUser: null,
          errorCode: errorCode,
          errorDetail: error, // Optionally include the full error object for more details
        };
      }
    },
    updateUser: async (_: any, { id, userUpdates }: { id: number; userUpdates: UserUpdates }): Promise<UserMutationResponse> => {   
      try {
        const updatedUser = await services.userService.updateUser(id, userUpdates);
       
        if (!updatedUser) {
          return {
            success: false,
            message: `User with id ${id} not found. Update failed.`,
            singleUser: null,
          };
        }
        return {
          success: true,
          message: "User updated successfully.",
          singleUser: updatedUser,
        };
      } catch (error:any) {
        console.error(`Error in updateUser resolver for id ${id}:`, error); // Log the full error object
    
        // Assuming error has a 'code' and 'message' property
        const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
        const errorMessage = error.message || 'An unexpected error occurred.';
    
        return {
          success: false,
          message: errorMessage,
          singleUser: null,
          errorCode: errorCode,
          errorDetail: error, // Optionally include the full error object for more details
        };
      }
    },
    
    deleteUser: async (_: any, { id }: { id: number }): Promise<UserMutationResponse> => {
      try {
        const deletedUser = await services.userService.deleteUser(id);
        return {
          success: true,
          message: `User with id ${id} deleted successfully.`,
          singleUser: deletedUser,
        };
      } catch (error) {
        console.error(`Error in deleteUser resolver for id ${id}:`, error);
        return {
          success: false,
          message: "Could not delete the user. Please check the user ID and try again.",
          singleUser: null,
        };
      }
    },
  },
};
