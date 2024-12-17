import { ID, Query } from 'node-appwrite';
import { databases } from '../config/appwrite';
import { DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { AppwriteUser, CreateUserInput } from '../types/models';

export class UserService {
    async createUser(userData: CreateUserInput): Promise<AppwriteUser> {
        // Check if user with email already exists
        const existingUser = await this.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        return await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            ID.unique(),
            userData
        );
    }

    async getUserById(userId: string): Promise<AppwriteUser> {
        return await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId
        );
    }

    async getUserByEmail(email: string): Promise<AppwriteUser | null> {
        try {
            const users = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.USERS,
                [Query.equal('email', email)]
            );

            return users.documents[0] as AppwriteUser || null;
        } catch (error) {
            console.error('Error getting user by email:', error);
            return null;
        }
    }

    async updateUser(userId: string, updates: Partial<CreateUserInput>): Promise<AppwriteUser> {
        // If email is being updated, check if new email is already in use
        if (updates.email) {
            const existingUser = await this.getUserByEmail(updates.email);
            if (existingUser && existingUser.$id !== userId) {
                throw new Error('Email is already in use');
            }
        }

        return await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId,
            updates
        );
    }

    async deleteUser(userId: string): Promise<boolean> {
        await databases.deleteDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId
        );
        return true;
    }

    async listUsers(queries: string[] = []): Promise<{ total: number; users: AppwriteUser[] }> {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.USERS,
            queries
        );

        return {
            total: response.total,
            users: response.documents as AppwriteUser[]
        };
    }
}
