import { databases, storage, DATABASE_ID, COLLECTIONS, STORAGE_BUCKETS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';
import { AppwriteOrganizer, CreateInput, UpdateInput } from '../types/appwrite';

export class OrganizerService {
    async createOrganizer(organizerData: CreateInput<AppwriteOrganizer>) {
        try {
            const existingOrganizer = await this.getOrganizerByEmail(organizerData.email);
            if (existingOrganizer) {
                throw new Error('Organizer with this email already exists');
            }

            const organizer = await databases.createDocument<AppwriteOrganizer>(
                DATABASE_ID,
                COLLECTIONS.ORGANIZERS,
                ID.unique(),
                organizerData
            );
            return organizer;
        } catch (error) {
            console.error('Error creating organizer:', error);
            throw error;
        }
    }

    async uploadOrganizerImage(file: File) {
        try {
            const upload = await storage.createFile(
                STORAGE_BUCKETS.ORGANIZER_IMAGES,
                ID.unique(),
                file
            );
            return storage.getFileView(STORAGE_BUCKETS.ORGANIZER_IMAGES, upload.$id);
        } catch (error) {
            console.error('Error uploading organizer image:', error);
            throw error;
        }
    }

    async getOrganizerById(organizerId: string) {
        try {
            return await databases.getDocument<AppwriteOrganizer>(
                DATABASE_ID,
                COLLECTIONS.ORGANIZERS,
                organizerId
            );
        } catch (error) {
            console.error('Error getting organizer:', error);
            throw error;
        }
    }

    async getOrganizerByEmail(email: string) {
        try {
            const organizers = await databases.listDocuments<AppwriteOrganizer>(
                DATABASE_ID,
                COLLECTIONS.ORGANIZERS,
                [Query.equal('email', email)]
            );
            return organizers.documents[0] || null;
        } catch (error) {
            console.error('Error getting organizer by email:', error);
            throw error;
        }
    }

    async updateOrganizer(organizerId: string, updates: UpdateInput<AppwriteOrganizer>) {
        try {
            if (updates.email) {
                const existingOrganizer = await this.getOrganizerByEmail(updates.email);
                if (existingOrganizer && existingOrganizer.$id !== organizerId) {
                    throw new Error('Email already in use');
                }
            }

            return await databases.updateDocument<AppwriteOrganizer>(
                DATABASE_ID,
                COLLECTIONS.ORGANIZERS,
                organizerId,
                updates
            );
        } catch (error) {
            console.error('Error updating organizer:', error);
            throw error;
        }
    }

    async deleteOrganizer(organizerId: string) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.ORGANIZERS,
                organizerId
            );
            return true;
        } catch (error) {
            console.error('Error deleting organizer:', error);
            throw error;
        }
    }

    async searchOrganizers(query: string) {
        try {
            const organizers = await databases.listDocuments<AppwriteOrganizer>(
                DATABASE_ID,
                COLLECTIONS.ORGANIZERS,
                [Query.search('name', query)]
            );
            return organizers.documents;
        } catch (error) {
            console.error('Error searching organizers:', error);
            throw error;
        }
    }
} 