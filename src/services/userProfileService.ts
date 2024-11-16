import { Repository } from "typeorm";
import { UserProfile } from "../entities/User.js";
import { handleError } from "../utils/handleError.js";
import { services } from "./index.js";
import { GraphQLError } from "graphql";
import { validateUsername } from "../utils/fieldsValidator.js";
import { getManager } from "typeorm";


export class UserProfileService {
  private userProfileRepository: Repository<UserProfile>;

  constructor(userProfileRepository: Repository<UserProfile>) {
    this.userProfileRepository = userProfileRepository;
  }
  async createUserProfile(userId: number, profileData: Partial<UserProfile>): Promise<UserProfile> {
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
  async getProfile(username: string): Promise<UserProfile | null> {
    const profile = await this.userProfileRepository.findOne({ where: { username }, });
    return profile
  }
  async updateUserProfile(id: number, profileData: Partial<UserProfile>): Promise<UserProfile | null> {
    try {

      if (Object.keys(profileData).length) {
        if ((profileData?.username)) {
          if (!validateUsername(String(profileData?.username))) {
            throw new GraphQLError("Invalid username.", {
              extensions: { code: "BAD_USER_INPUT" }
            })
          }
          
          const trimmedName = profileData.username.trim().toLowerCase();
         
          const userProfile = await this.getProfile(profileData?.username);
          const existingProfileName = userProfile?.username? userProfile.username.trim().toLowerCase() : null
          console.log(trimmedName)
          console.log(existingProfileName)
          if (userProfile) {
            throw new GraphQLError("Username is already taken.", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }
          const user = await services.userService.getUserById(id);
          const profileID = user?.profile ? user.profile.id : null;
          if (!profileID) {
            return await this.createUserProfile(id, profileData);
          }
          const updatedProfile = await this.userProfileRepository.update(profileID, profileData);
          if (updatedProfile.affected === 0) {
            throw new GraphQLError(`update failed on userprofile with id ${user?.profile.id ?? 0}`);
          }
          return await this.userProfileRepository.findOne({ where: { id: profileID } });
        }

      }
      return null
    } catch (error) {
      throw handleError(error);
    }

  }

}
