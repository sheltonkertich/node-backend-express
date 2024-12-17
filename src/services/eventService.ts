import { databases, storage, DATABASE_ID, COLLECTIONS, STORAGE_BUCKETS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';
import { AppwriteEvent, CreateInput, UpdateInput } from '../types/appwrite';

export class EventService {
    async createEvent(eventData: CreateInput<AppwriteEvent>) {
        try {
            const event = await databases.createDocument<AppwriteEvent>(
                DATABASE_ID,
                COLLECTIONS.EVENTS,
                ID.unique(),
                eventData
            );
            return event;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    async uploadEventImage(file: File) {
        try {
            const upload = await storage.createFile(
                STORAGE_BUCKETS.EVENT_IMAGES,
                ID.unique(),
                file
            );
            return storage.getFileView(STORAGE_BUCKETS.EVENT_IMAGES, upload.$id);
        } catch (error) {
            console.error('Error uploading event image:', error);
            throw error;
        }
    }

    async getEventById(eventId: string) {
        try {
            return await databases.getDocument<AppwriteEvent>(
                DATABASE_ID,
                COLLECTIONS.EVENTS,
                eventId
            );
        } catch (error) {
            console.error('Error getting event:', error);
            throw error;
        }
    }

    async getAllEvents(queries: string[] = []) {
        try {
            const events = await databases.listDocuments<AppwriteEvent>(
                DATABASE_ID,
                COLLECTIONS.EVENTS,
                queries
            );
            return events.documents;
        } catch (error) {
            console.error('Error getting events:', error);
            throw error;
        }
    }

    async updateEvent(eventId: string, updates: UpdateInput<AppwriteEvent>) {
        try {
            return await databases.updateDocument<AppwriteEvent>(
                DATABASE_ID,
                COLLECTIONS.EVENTS,
                eventId,
                updates
            );
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    async deleteEvent(eventId: string) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.EVENTS,
                eventId
            );
            return true;
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
}
