import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/user', authController.getCurrentUser);

// Password recovery
router.post('/recovery', authController.sendPasswordRecovery);
router.post('/recovery/confirm', authController.completePasswordRecovery);

// Magic link
router.post('/magic-link', authController.sendMagicLink);
router.post('/magic-link/confirm', authController.completeMagicLink);

// OAuth
router.get('/oauth/:provider', authController.createOAuthSession);

export default router; 