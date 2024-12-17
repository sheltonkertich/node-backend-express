import { ID, Query } from 'node-appwrite';
import { databases } from '../config/appwrite';
import { DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { AppwriteOrganizer, CreateOrganizerInput } from '../types/models';

export class OrganizerService {
    async createOrganizer(organizerData: CreateOrganizerInput): Promise<AppwriteOrganizer> {
        // Check if organizer with email already exists
        const existingOrganizer = await this.getOrganizerByEmail(organizerData.email);
        if (existingOrganizer) {
            throw new Error('Organizer with this email already exists');
        }

        return await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.ORGANIZERS,
            ID.unique(),
            organizerData
        );
    }

    async getOrganizerById(organizerId: string): Promise<AppwriteOrganizer> {
        return await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.ORGANIZERS,
            organizerId
        );
    }

    async getOrganizerByEmail(email: string): Promise<AppwriteOrganizer | null> {
        try {
            const organizers = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.ORGANIZERS,
                [Query.equal('email', email)]
            );

            return organizers.documents[0] as AppwriteOrganizer || null;
        } catch (error) {
            console.error('Error getting organizer by email:', error);
            return null;
        }
    }

    async updateOrganizer(organizerId: string, updates: Partial<CreateOrganizerInput>): Promise<AppwriteOrganizer> {
        // If email is being updated, check if new email is already in use
        if (updates.email) {
            const existingOrganizer = await this.getOrganizerByEmail(updates.email);
            if (existingOrganizer && existingOrganizer.$id !== organizerId) {
                throw new Error('Email is already in use');
            }
        }

        return await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.ORGANIZERS,
            organizerId,
            updates
        );
    }

    async deleteOrganizer(organizerId: string): Promise<boolean> {
        await databases.deleteDocument(
            DATABASE_ID,
            COLLECTIONS.ORGANIZERS,
            organizerId
        );
        return true;
    }

    async listOrganizers(queries: string[] = []): Promise<{ total: number; organizers: AppwriteOrganizer[] }> {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.ORGANIZERS,
            queries
        );

        return {
            total: response.total,
            organizers: response.documents as AppwriteOrganizer[]
        };
    }
} 