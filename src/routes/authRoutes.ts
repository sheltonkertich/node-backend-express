import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Password recovery
router.post('/recovery', authController.createRecovery);
router.post('/recovery/confirm', authController.updateRecovery);

// Email verification
router.post('/verify', authController.createVerification);
router.post('/verify/confirm', authController.completeVerification);

// OAuth routes
router.get('/oauth/:provider', authController.createOAuth2Session);

export default router; 