import { Router } from 'express';
import { EventController } from '../controllers/eventController';
import { EventInteractionController } from '../controllers/eventInteractionController';
import { FileAuthRequest } from '../types/routes';
import fileUpload from 'express-fileupload';

const router = Router();
const eventController = new EventController();
const interactionController = new EventInteractionController();

// File upload middleware
const uploadMiddleware = fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true
});

// Event CRUD routes
router.post('/', uploadMiddleware as any, (req, res) => eventController.createEvent(req as FileAuthRequest, res));
router.get('/', (req, res) => eventController.getAllEvents(req, res));
router.get('/:id', (req, res) => eventController.getEvent(req, res));
router.put('/:id', uploadMiddleware as any, (req, res) => eventController.updateEvent(req as FileAuthRequest, res));
router.delete('/:id', (req, res) => eventController.deleteEvent(req, res));

// Event interaction routes
router.post('/:eventId/like', (req, res) => interactionController.likeEvent(req, res));
router.post('/:eventId/bookmark', (req, res) => interactionController.bookmarkEvent(req, res));

export default router; 