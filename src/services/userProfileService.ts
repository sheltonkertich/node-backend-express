import { Repository } from "typeorm";
import {  UserProfile } from "../entities/User.js";
import { handleError } from "../utils/handleError.js";


export class UserProfileService {
  private userProfileRepository: Repository<UserProfile>;

  constructor(userProfileRepository: Repository<UserProfile>) {
    this.userProfileRepository = userProfileRepository;
  }
  async createUser(profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const profile = this.userProfileRepository.create(profileData);
      return await this.userProfileRepository.save(profileData);
    } catch (error) {
      throw handleError(error);
    }
  }

}
