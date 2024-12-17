import { databases, storage, account, DATABASE_ID, COLLECTIONS, STORAGE_BUCKETS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';
import { AppwriteUser, CreateInput, UpdateInput } from '../types/appwrite';

export class UserService {
    async createUser(userData: CreateInput<AppwriteUser>) {
        try {
            const existingUser = await this.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            const user = await databases.createDocument<AppwriteUser>(
                DATABASE_ID,
                COLLECTIONS.USERS,
                ID.unique(),
                userData
            );
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async uploadAvatar(file: File) {
        try {
            const upload = await storage.createFile(
                STORAGE_BUCKETS.USER_AVATARS,
                ID.unique(),
                file
            );
            return storage.getFileView(STORAGE_BUCKETS.USER_AVATARS, upload.$id);
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw error;
        }
    }

    async getUserById(userId: string) {
        try {
            return await databases.getDocument<AppwriteUser>(
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
            const users = await databases.listDocuments<AppwriteUser>(
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

    async updateUser(userId: string, updates: UpdateInput<AppwriteUser>) {
        try {
            if (updates.email) {
                const existingUser = await this.getUserByEmail(updates.email);
                if (existingUser && existingUser.$id !== userId) {
                    throw new Error('Email already in use');
                }
            }

            return await databases.updateDocument<AppwriteUser>(
                DATABASE_ID,
                COLLECTIONS.USERS,
                userId,
                updates
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

    async searchUsers(query: string) {
        try {
            const users = await databases.listDocuments<AppwriteUser>(
                DATABASE_ID,
                COLLECTIONS.USERS,
                [Query.search('name', query)]
            );
            return users.documents;
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }
}
