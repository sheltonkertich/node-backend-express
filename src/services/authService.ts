import { ID } from 'node-appwrite';
import { account } from '../config/appwrite';
import { CreateUserInput } from '../types/models';

export class AuthService {
    async register(userData: CreateUserInput) {
        const { email, password, name } = userData;
        
        return await account.create(
            ID.unique(),
            email,
            password,
            name
        );
    }

    async login(email: string, password: string) {
        return await account.createSession(email, password);
    }

    async logout() {
        return await account.deleteSession('current');
    }

    async getCurrentUser() {
        return await account.get();
    }

    async updatePassword(password: string, oldPassword: string) {
        return await account.updatePassword(password, oldPassword);
    }

    async sendPasswordRecovery(email: string, url: string) {
        return await account.createRecovery(email, url);
    }

    async completePasswordRecovery(
        userId: string,
        secret: string,
        password: string
    ) {
        return await account.updateRecovery(userId, secret, password);
    }

    async sendMagicLink(email: string, url: string) {
        return await account.updateMagicURLSession(ID.unique(), email);
    }

    async completeMagicLink(userId: string, secret: string) {
        return await account.updateMagicURLSession(userId, secret);
    }

    async createOAuthSession(provider: string) {
        const successUrl = process.env.OAUTH_SUCCESS_URL || 'http://localhost:3000/auth/success';
        const failureUrl = process.env.OAUTH_FAILURE_URL || 'http://localhost:3000/auth/failure';
        
        return await account.createSession(provider, successUrl);
    }
} 