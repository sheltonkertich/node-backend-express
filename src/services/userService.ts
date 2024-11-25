import { Repository } from "typeorm";
import { User } from "../entities/User.js";
import { BaseService } from "./baseService.js";

export class UserService extends BaseService<User> {
  constructor(userRepository: Repository<User>) {
    super(userRepository);
  }

  async getAllUsers(): Promise<User[]> {
    return this.executeOperation(() => 
      this.repository.find({
        relations: { profile: true, tickets: true }
      })
    );
  }

  async getUserById(id: number): Promise<User> {
    return this.executeOperation(() => 
      this.findOneByIdOrThrow(id, ['profile', 'tickets'])
    );
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.executeOperation(async () => {
      const user = this.repository.create(userData);
      return await this.repository.save(user);
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.executeOperation(async () => {
      const result = await this.repository.update(id, userData);

      if (result.affected === 0) {
        this.throwNotFoundError("User", id);
      }

      return await this.findOneByIdOrThrow(id, ['profile', 'tickets']);
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.executeOperation(async () => {
      const user = await this.findOneByIdOrThrow(id);
      await this.repository.softDelete({ id });
      return user;
    });
  }
}
