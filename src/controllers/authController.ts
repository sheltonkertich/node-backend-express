import services from '../services';
import { Request, Response } from 'express';
import { CreateInput } from '../types/appwrite';

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;

            // Create Appwrite account
            const account = await services.auth.createAccount(email, password, name);

            // Create user profile in database
            const userData = {
                name,
                email,
                imageUrl: undefined
            };
            await services.user.createUser(userData);

            // Create session
            await services.auth.createSession(email, password);

            return res.status(201).json({
                success: true,
                message: 'Registration successful',
                user: account
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Registration failed'
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const session = await services.auth.createSession(email, password);
            const user = await services.auth.getCurrentUser();

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                session,
                user
            });
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            await services.auth.logout();
            return res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Logout failed'
            });
        }
    }

    async createRecovery(req: Request, res: Response) {
        try {
            const { email, url } = req.body;
            await services.auth.createRecovery(email, url);
            return res.json({
                success: true,
                message: 'Recovery email sent'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Recovery failed'
            });
        }
    }

    async updateRecovery(req: Request, res: Response) {
        try {
            const { userId, secret, password, confirmPassword } = req.body;
            await services.auth.updateRecovery(userId, secret, password, confirmPassword);
            return res.json({
                success: true,
                message: 'Password updated successfully'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Recovery update failed'
            });
        }
    }

    async createVerification(req: Request, res: Response) {
        try {
            const { url } = req.body;
            await services.auth.createVerification(url);
            return res.json({
                success: true,
                message: 'Verification email sent'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Verification failed'
            });
        }
    }

    async completeVerification(req: Request, res: Response) {
        try {
            const { userId, secret } = req.body;
            await services.auth.completeVerification(userId, secret);
            return res.json({
                success: true,
                message: 'Email verified successfully'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Verification failed'
            });
        }
    }

    async createOAuth2Session(req: Request, res: Response) {
        try {
            const { provider } = req.params;
            const { success, failure } = req.query;
            await services.auth.createOAuth2Session(
                provider as 'google' | 'github' | 'facebook',
                success as string,
                failure as string
            );
            return res.json({
                success: true,
                message: 'OAuth session created'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'OAuth failed'
            });
        }
    }
} 