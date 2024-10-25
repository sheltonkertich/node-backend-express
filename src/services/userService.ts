import { Repository } from "typeorm";
import {User} from "../entities/User.js";

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
      return await this.userRepository.save(user);
    } catch (error:any) {
      const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
      const errorMessage = error.detail || 'An unexpected error occurred.';
      console.error(`Service Error creating user: ${errorMessage}`, error);
      throw new Error(`Failed to create user. Error Code: ${errorCode}. Message: ${errorMessage}`);
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    try {
      const result = await this.userRepository.update(id,userData)
      
      if (result.affected === 0) {
        throw new Error(`User with id ${id} not found.`);
      }
      return await this.userRepository.findOneBy({ id });
    } catch (error:any) {
      const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
      const errorMessage = error.detail || 'An unexpected error occurred.';
      console.error(`Service Error updating user: ${errorMessage}`, error);
      throw new Error(`Failed to update user. Error Code: ${errorCode}. Message: ${errorMessage}`);
    }
  }

  async deleteUser(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User with id ${id} not found.`);
      }
      await this.userRepository.remove(user);
      return user;
    } catch (error:any) {
      const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
      const errorMessage = error.detail || 'An unexpected error occurred.';
      console.error(`Service Error deleting user: ${errorMessage}`, error);
      throw new Error(`Failed to delete user. Error Code: ${errorCode}. Message: ${errorMessage}`);
    }
  }
}
