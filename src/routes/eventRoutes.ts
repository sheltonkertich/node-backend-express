import { Router } from 'express';
import { EventController } from '../controllers/eventController';
import { EventInteractionController } from '../controllers/eventInteractionController';
import fileUpload from 'express-fileupload';

const router = Router();
const eventController = new EventController();
const interactionController = new EventInteractionController();

// File upload middleware
const upload = fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    abortOnLimit: true
});

// Event CRUD routes
router.post('/', upload, eventController.createEvent.bind(eventController));
router.get('/', eventController.getAllEvents.bind(eventController));
router.get('/:id', eventController.getEvent.bind(eventController));
router.put('/:id', upload, eventController.updateEvent.bind(eventController));
router.delete('/:id', eventController.deleteEvent.bind(eventController));

// Event interaction routes
router.post('/:eventId/like', interactionController.likeEvent.bind(interactionController));
router.post('/:eventId/bookmark', interactionController.bookmarkEvent.bind(interactionController));

export default router; 