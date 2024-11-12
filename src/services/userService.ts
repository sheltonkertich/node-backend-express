import { Repository } from "typeorm";
import { User } from "../entities/User.js";
import { handleError } from "../utils/handleError.js";
import { GraphQLError } from "graphql";


export class UserService {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const user = this.userRepository.create(userData);
      console.log(user.id);
      return await this.userRepository.save(user);
    } catch (error) {
      throw handleError(error);
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    try {
      const result = await this.userRepository.update(id, userData)

      if (result.affected === 0) {
        throw new GraphQLError(`User with id ${id} not found.`);
      }
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteUser(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new GraphQLError(`User with id ${id} not found.`);
      }
      await this.userRepository.softDelete({ id });
      return user;
    } catch (error) {
      throw handleError(error);
    }
  }
}
