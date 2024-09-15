import { Repository } from "typeorm";
import User from "../entities/User.js";

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
      const user = this.userRepository.create(userData);
      return await this.userRepository.save(user);
    }
  }