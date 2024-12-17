import { account } from '../config/appwrite';
import { ID } from 'node-appwrite';

export class AuthService {
    async createAccount(email: string, password: string, name: string) {
        try {
            const user = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return user;
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }

    async createSession(email: string, password: string) {
        try {
            return await account.createSession(email, password);
        } catch (error) {
            console.error('Error creating session:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await account.deleteSessions();
            return true;
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    async updatePassword(password: string, oldPassword?: string) {
        try {
            return await account.updatePassword(password, oldPassword);
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }

    async createRecovery(email: string, url: string) {
        try {
            return await account.createRecovery(email, url);
        } catch (error) {
            console.error('Error creating recovery:', error);
            throw error;
        }
    }

    async updateRecovery(userId: string, secret: string, password: string, confirmPassword: string) {
        try {
            return await account.updateRecovery(
                userId,
                secret,
                password,
                confirmPassword
            );
        } catch (error) {
            console.error('Error updating recovery:', error);
            throw error;
        }
    }

    async createVerification(url: string) {
        try {
            return await account.createVerification(url);
        } catch (error) {
            console.error('Error creating verification:', error);
            throw error;
        }
    }

    async completeVerification(userId: string, secret: string) {
        try {
            return await account.updateVerification(userId, secret);
        } catch (error) {
            console.error('Error completing verification:', error);
            throw error;
        }
    }

    async createMagicURLSession(email: string, url: string) {
        try {
            return await account.createMagicURLSession(ID.unique(), email, url);
        } catch (error) {
            console.error('Error creating magic URL session:', error);
            throw error;
        }
    }

    async updateMagicURLSession(userId: string, secret: string) {
        try {
            return await account.updateMagicURLSession(userId, secret);
        } catch (error) {
            console.error('Error updating magic URL session:', error);
            throw error;
        }
    }

    async getSession(sessionId: string) {
        try {
            return await account.getSession(sessionId);
        } catch (error) {
            console.error('Error getting session:', error);
            throw error;
        }
    }

    async getSessions() {
        try {
            return await account.listSessions();
        } catch (error) {
            console.error('Error getting sessions:', error);
            throw error;
        }
    }

    async deleteSession(sessionId: string) {
        try {
            await account.deleteSession(sessionId);
            return true;
        } catch (error) {
            console.error('Error deleting session:', error);
            throw error;
        }
    }

    async createOAuth2Session(provider: 'google' | 'github' | 'facebook', successUrl?: string, failureUrl?: string) {
        try {
            return await account.createOAuth2Session(provider, successUrl, failureUrl);
        } catch (error) {
            console.error(`Error creating ${provider} session:`, error);
            throw error;
        }
    }
} 