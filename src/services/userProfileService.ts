import { Repository } from "typeorm";
import {  UserProfile } from "../entities/User.js";
import { handleError } from "../utils/handleError.js";
import { services } from "./index.js";
import { GraphQLError } from "graphql";


export class UserProfileService {
  private userProfileRepository: Repository<UserProfile>;

  constructor(userProfileRepository: Repository<UserProfile>) {
    this.userProfileRepository = userProfileRepository;
  }
  async createUserProfile(userId: number, profileData:Partial<UserProfile>): Promise<UserProfile> {
    try {
      const user = await services.userService.getUserById(userId); 
      if (!user) {
        throw new GraphQLError(`user with id${userId} not found.cant create profile`);
      }
      const newProfile = this.userProfileRepository.create({
        username: profileData.username,
        user: { id: userId },
      });
      console.log(userId)
      console.log(newProfile);
      return await this.userProfileRepository.save(newProfile);
    } catch (error) {
      throw handleError(error);
    }
  }

}
