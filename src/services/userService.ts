import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';
import { UserType } from '../entities/User';

export class UserService {
  async createUser(userData: {
    firstName: string;
    lastName?: string;
    email: string;
    userType?: UserType;
  }) {
    try {
      const user = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        ID.unique(),
        {
          firstName: userData.firstName,
          lastName: userData.lastName || null,
          email: userData.email,
          userType: userData.userType || UserType.NORMAL_USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      );
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const users = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [Query.equal('email', email)]
      );

      return users.documents[0] || null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    userType: UserType;
  }>) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId,
        {
          ...userData,
          updatedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      );
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS
      );
      return users.documents;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }
}
