import { Request, Response } from 'express';
import services from '../services';
import { CreateUserInput } from '../types/models';

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;

            // Create account in Appwrite
            const account = await services.auth.register({ email, password, name });

            // Create user document
            const userData: CreateUserInput = {
                email,
                password,
                name
            };
            await services.user.createUser(userData);

            // Create session
            await services.auth.login(email, password);

            res.status(201).json({ message: 'Account created successfully', account });
        } catch (error) {
            res.status(400).json({ message: 'Failed to create account', error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const session = await services.auth.login(email, password);
            res.status(200).json({ message: 'Login successful', session });
        } catch (error) {
            res.status(401).json({ message: 'Login failed', error });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            await services.auth.logout();
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            res.status(500).json({ message: 'Logout failed', error });
        }
    }

    async getCurrentUser(req: Request, res: Response) {
        try {
            const user = await services.auth.getCurrentUser();
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ message: 'Failed to get current user', error });
        }
    }

    async sendPasswordRecovery(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const url = process.env.PASSWORD_RECOVERY_URL || 'http://localhost:3000/reset-password';

            await services.auth.sendPasswordRecovery(email, url);
            res.status(200).json({ message: 'Password recovery email sent' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to send recovery email', error });
        }
    }

    async completePasswordRecovery(req: Request, res: Response) {
        try {
            const { userId, secret, password } = req.body;

            await services.auth.completePasswordRecovery(userId, secret, password);
            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to update password', error });
        }
    }

    async sendMagicLink(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const url = process.env.MAGIC_LINK_URL || 'http://localhost:3000/verify';

            await services.auth.sendMagicLink(email, url);
            res.status(200).json({ message: 'Magic link sent' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to send magic link', error });
        }
    }

    async completeMagicLink(req: Request, res: Response) {
        try {
            const { userId, secret } = req.body;

            await services.auth.completeMagicLink(userId, secret);
            res.status(200).json({ message: 'Magic link verification successful' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to verify magic link', error });
        }
    }

    async createOAuthSession(req: Request, res: Response) {
        try {
            const { provider } = req.params;

            await services.auth.createOAuthSession(provider);
            res.status(200).json({ message: 'OAuth session created' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to create OAuth session', error });
        }
    }
} 