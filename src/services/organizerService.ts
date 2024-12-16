import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';

interface OrganizerData {
  name: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  logo?: string;
  address: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export class OrganizerService {
  async createOrganizer(organizerData: OrganizerData) {
    try {
      const organizer = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZERS,
        ID.unique(),
        {
          ...organizerData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      return organizer;
    } catch (error) {
      console.error('Error creating organizer:', error);
      throw error;
    }
  }

  async getOrganizerById(organizerId: string) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZERS,
        organizerId
      );
    } catch (error) {
      console.error('Error getting organizer:', error);
      throw error;
    }
  }

  async getAllOrganizers(queries: string[] = []) {
    try {
      const organizers = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ORGANIZERS,
        queries
      );
      return organizers.documents;
    } catch (error) {
      console.error('Error getting organizers:', error);
      throw error;
    }
  }

  async updateOrganizer(organizerId: string, organizerData: Partial<OrganizerData>) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZERS,
        organizerId,
        {
          ...organizerData,
          updatedAt: new Date().toISOString(),
        }
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

  async getOrganizerEvents(organizerId: string) {
    try {
      const events = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENTS,
        [Query.equal('organizerId', organizerId)]
      );
      return events.documents;
    } catch (error) {
      console.error('Error getting organizer events:', error);
      throw error;
    }
  }

  async getOrganizerTours(organizerId: string) {
    try {
      const tours = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        [Query.equal('organizerId', organizerId)]
      );
      return tours.documents;
    } catch (error) {
      console.error('Error getting organizer tours:', error);
      throw error;
    }
  }
} 