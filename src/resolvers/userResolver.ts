import { GraphQLError } from "graphql";
import { User } from "../entities/User.js";
import { services } from "../services/index.js";
import { UserInput, UserUpdates, UserMutationResponse, UserQueryResponse } from "../types/userTypes.js";
import { handleGraphQLError } from "../utils/handleError.js";
import isEmail from 'validator/lib/isEmail.js';
import { validateUsername } from "../utils/fieldsValidator.js";
import { generateUsername } from "../utils/fieldsGenerator.js";

;

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
          users: UsersResult
        };

      } catch (error: any) {
        return handleGraphQLError(error, { singleUser: null });

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
      } catch (error: any) {
        return handleGraphQLError(error, { singleUser: null });

      }
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }): Promise<UserMutationResponse> => {
      try {

        if (!isEmail(input.email)) {
          throw new GraphQLError("Invalid email address.", { extensions: { code: "BAD_USER_INPUT" } });
        }
        const user = await services.userService.createUser(input);
        try {
          const username = generateUsername(user.firstName, user.id)
          console.log(username)
          await services.userProfileService.createUserProfile( user.id,{username} )
        } catch (error: any) {
          return handleGraphQLError(error, { singleProfile: null });
        }
        return {
          success: true,
          message: "User created successfully.",
          singleUser: user
        };
      } catch (error: any) {
        return handleGraphQLError(error, { singleUser: null });

      }
    },
    updateUser: async (_: any, { id, userUpdates }: { id: number; userUpdates: Partial<UserUpdates> }): Promise<UserMutationResponse> => {

      try {

        if (Object.keys(userUpdates).includes('profile')) {
          if (!validateUsername(String(userUpdates.profile?.username))) { throw new GraphQLError("Invalid username.", { extensions: { code: "BAD_USER_INPUT" } }) }

        }

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
      } catch (error: any) {
        return handleGraphQLError(error, { singleUser: null });

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
      } catch (error: any) {
        return handleGraphQLError(error, { singleUser: null });

      }
    },
  },
};
