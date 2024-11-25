import { GraphQLError } from "graphql";
import { UserProfile } from "../entities/User.js";
import { services } from "../services/index.js";
import { UserInput, UserUpdates, UserMutationResponse, UserQueryResponse } from "../types/userTypes.js";
import { handleGraphQLError } from "../utils/handleError.js";
import isEmail from 'validator/lib/isEmail.js';
import { generateUsername } from "../utils/fieldsGenerator.js";

export const userResolvers = {
  Query: {
    getUsers: async (): Promise<UserQueryResponse> => {
      try {
        const users = await services.userService.getAllUsers();
        return {
          success: true,
          message: users.length ? "Users found" : "No users found",
          users: users.length ? users : null
        };
      } catch (error) {
        return handleGraphQLError(error, { users: null });
      }
    },

    getUser: async (_: any, { id }: { id: number }): Promise<UserQueryResponse> => {
      try {
        const user = await services.userService.getUserById(id);
        return {
          success: true,
          message: "User fetched successfully",
          user
        };
      } catch (error) {
        return handleGraphQLError(error, { user: null });
      }
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }): Promise<UserMutationResponse> => {
      try {
        if (!isEmail(input.email)) {
          throw new GraphQLError("Invalid email address.", { 
            extensions: { code: "BAD_USER_INPUT" } 
          });
        }

        const user = await services.userService.createUser(input);
        
        // Create initial profile with generated username
        const username = generateUsername(user.firstName, user.id);
        const userProfile = await services.userProfileService.createUserProfile(
          user.id, 
          { username }
        );

        return {
          success: true,
          message: "User created successfully",
          singleUser: user,
          singleProfile: userProfile
        };
      } catch (error) {
        return handleGraphQLError(error, { 
          singleUser: null, 
          singleProfile: null 
        });
      }
    },

    updateUser: async (
      _: any, 
      { 
        id, 
        userUpdates, 
        profileUpdates 
      }: { 
        id: number; 
        userUpdates: Partial<UserUpdates>; 
        profileUpdates: Partial<UserProfile> 
      }
    ): Promise<UserMutationResponse> => {
      try {
        // Process updates in parallel if both exist
        const [updatedProfile, updatedUser] = await Promise.all([
          profileUpdates ? services.userProfileService.updateUserProfile(id, profileUpdates) : null,
          userUpdates ? services.userService.updateUser(id, userUpdates) : null
        ]);

        if (!updatedUser && !updatedProfile) {
          return {
            success: false,
            message: "No updates provided",
            singleUser: null,
            singleProfile: null
          };
        }

        return {
          success: true,
          message: "User updated successfully",
          singleUser: updatedUser,
          singleProfile: updatedProfile
        };
      } catch (error) {
        return handleGraphQLError(error, { 
          singleUser: null, 
          singleProfile: null 
        });
      }
    },

    deleteUser: async (_: any, { id }: { id: number }): Promise<UserMutationResponse> => {
      try {
        const deletedUser = await services.userService.deleteUser(id);
        return {
          success: true,
          message: `User with id ${id} deleted successfully`,
          singleUser: deletedUser
        };
      } catch (error) {
        return handleGraphQLError(error, { singleUser: null });
      }
    },
  },
};
