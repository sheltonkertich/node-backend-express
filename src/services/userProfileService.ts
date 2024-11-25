import { Repository } from "typeorm";
import { UserProfile } from "../entities/User.js";
import { services } from "./index.js";
import { validateUsername } from "../utils/fieldsValidator.js";
import { BaseService } from "./baseService.js";

export class UserProfileService extends BaseService<UserProfile> {
  constructor(userProfileRepository: Repository<UserProfile>) {
    super(userProfileRepository);
  }

  private async checkUsernameAvailability(username: string, excludeId?: number): Promise<void> {
    const normalizedUsername = username.trim();
    const query = this.repository
      .createQueryBuilder('profile')
      .where('LOWER(profile.username) = LOWER(:username)', { 
        username: normalizedUsername 
      });

    if (excludeId) {
      query.andWhere('profile.id != :id', { id: excludeId });
    }

    const existingProfile = await query.getOne();

    if (existingProfile) {
      this.throwValidationError("Username is already taken.");
    }
  }

  private async validateAndNormalizeUsername(username: string): Promise<string> {
    if (!validateUsername(username)) {
      this.throwValidationError("Invalid username.");
    }
    return username.trim();
  }

  async createUserProfile(userId: number, profileData: Partial<UserProfile>): Promise<UserProfile> {
    return this.executeOperation(async () => {
      await services.userService.getUserById(userId);

      if (profileData.username) {
        await this.checkUsernameAvailability(profileData.username);
        profileData.username = profileData.username.trim();
      }

      const newProfile = this.repository.create({
        ...profileData,
        user: { id: userId },
      });
      
      return await this.repository.save(newProfile);
    });
  }

  async getProfile(username: string): Promise<UserProfile | null> {
    return this.executeOperation(() => 
      this.repository
        .createQueryBuilder('profile')
        .where('LOWER(profile.username) = LOWER(:username)', { 
          username: username.trim() 
        })
        .getOne()
    );
  }

  async updateUserProfile(id: number, profileData: Partial<UserProfile>): Promise<UserProfile | null> {
    return this.executeOperation(async () => {
      if (!Object.keys(profileData).length || !profileData.username) {
        return null;
      }

      const user = await services.userService.getUserById(id);
      const profileID = user?.profile?.id;
      const normalizedUsername = await this.validateAndNormalizeUsername(profileData.username);
      
      // Check username availability, excluding current profile if it exists
      await this.checkUsernameAvailability(normalizedUsername, profileID);

      if (!profileID) {
        return this.createUserProfile(id, { 
          ...profileData, 
          username: normalizedUsername 
        });
      }

      await this.repository.update(profileID, {
        ...profileData,
        username: normalizedUsername
      });

      return await this.findOneByIdOrThrow(profileID);
    });
  }
}
