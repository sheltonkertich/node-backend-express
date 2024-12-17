import { Request, Response, NextFunction } from 'express';
import services from '../services';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await services.auth.getCurrentUser();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed'
        });
    }
} 