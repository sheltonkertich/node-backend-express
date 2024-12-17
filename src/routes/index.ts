import { Router } from 'express';
import authRoutes from './authRoutes';
import eventRoutes from './eventRoutes';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', requireAuth, eventRoutes);

export default router; 