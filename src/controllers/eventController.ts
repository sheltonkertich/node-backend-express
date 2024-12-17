import services from '../services';
import { Request, Response } from 'express';
import { STORAGE_BUCKETS } from '../config/appwrite';
import { CreateInput } from '../types/appwrite';
import { UploadedFile } from 'express-fileupload';

// Add interface for request with files
interface RequestWithFiles extends Request {
    files?: {
        [key: string]: UploadedFile;
    };
}

export class EventController {
    async createEvent(req: RequestWithFiles, res: Response) {
        try {
            const { 
                title, 
                description, 
                startDate, 
                endDate, 
                location,
                price,
                capacity,
                category 
            } = req.body;

            const imageFile = req.files?.image as UploadedFile;

            // Upload image if provided
            let imageUrl: string | undefined;
            if (imageFile) {
                const uploadResult = await services.storage.uploadFile(
                    STORAGE_BUCKETS.EVENT_IMAGES,
                    imageFile
                );
                imageUrl = uploadResult.toString();
            }

            // Create event
            const eventData = {
                title,
                description,
                startDate,
                endDate,
                location,
                imageUrl,
                organizerId: req.user!.$id,
                status: 'draft',
                price: Number(price),
                capacity: Number(capacity),
                category
            };

            const event = await services.event.createEvent(eventData);

            return res.status(201).json({
                success: true,
                message: 'Event created successfully',
                event
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Failed to create event'
            });
        }
    }

    async getAllEvents(req: Request, res: Response) {
        try {
            const events = await services.event.getAllEvents();
            return res.json({
                success: true,
                events
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Failed to fetch events'
            });
        }
    }

    async getEvent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const event = await services.event.getEventById(id);
            return res.json({
                success: true,
                event
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Failed to fetch event'
            });
        }
    }

    async updateEvent(req: RequestWithFiles, res: Response) {
        try {
            const { id } = req.params;
            const imageFile = req.files?.image as UploadedFile;

            let imageUrl: string | undefined;
            if (imageFile) {
                const uploadResult = await services.storage.uploadFile(
                    STORAGE_BUCKETS.EVENT_IMAGES,
                    imageFile
                );
                imageUrl = uploadResult.toString();
            }

            const eventData = {
                ...req.body,
                imageUrl
            };

            const event = await services.event.updateEvent(id, eventData);
            return res.json({
                success: true,
                message: 'Event updated successfully',
                event
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Failed to update event'
            });
        }
    }

    async deleteEvent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await services.event.deleteEvent(id);
            return res.json({
                success: true,
                message: 'Event deleted successfully'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Failed to delete event'
            });
        }
    }
} 