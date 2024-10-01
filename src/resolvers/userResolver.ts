import User from "../entities/User.js";
import { AppDataSource } from "../data-source.js";
import { UserService } from "../services/UserService.js";

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);

export const userResolvers = {
    Query: {
      getUsers: async () => {
        return await userService.getAllUsers();
      },
      getUser: async (_: any, { id }: { id: number }) => {
        return await userService.getUserById(id);
      }
    },
    Mutation: {
      createUser: async (_: any, { firstName,lastName,age, email }: { firstName: string,lastName:string,age:number, email: string }) => {
        return await userService.createUser({ firstName,lastName,age, email });
      }
    }
  };