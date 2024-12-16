import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';

interface TourData {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  category: string;
  tags?: string[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  organizerId: string;
  organizerName: string;
  includedServices?: string[];
  excludedServices?: string[];
  itinerary?: string[];
}

export class TourService {
  async createTour(tourData: TourData) {
    try {
      const tour = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        ID.unique(),
        {
          ...tourData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      return tour;
    } catch (error) {
      console.error('Error creating tour:', error);
      throw error;
    }
  }

  async getTourById(tourId: string) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        tourId
      );
    } catch (error) {
      console.error('Error getting tour:', error);
      throw error;
    }
  }

  async getAllTours(queries: string[] = []) {
    try {
      const tours = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        queries
      );
      return tours.documents;
    } catch (error) {
      console.error('Error getting tours:', error);
      throw error;
    }
  }

  async updateTour(tourId: string, tourData: Partial<TourData>) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        tourId,
        {
          ...tourData,
          updatedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error('Error updating tour:', error);
      throw error;
    }
  }

  async deleteTour(tourId: string) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        tourId
      );
      return true;
    } catch (error) {
      console.error('Error deleting tour:', error);
      throw error;
    }
  }

  // Additional methods for tour-specific operations
  async getToursByOrganizer(organizerId: string) {
    try {
      const tours = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        [Query.equal('organizerId', organizerId)]
      );
      return tours.documents;
    } catch (error) {
      console.error('Error getting tours by organizer:', error);
      throw error;
    }
  }

  async getToursByCategory(category: string) {
    try {
      const tours = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        [Query.equal('category', category)]
      );
      return tours.documents;
    } catch (error) {
      console.error('Error getting tours by category:', error);
      throw error;
    }
  }

  async getUpcomingTours() {
    try {
      const now = new Date().toISOString();
      const tours = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TOURS,
        [
          Query.greaterThan('startDate', now),
          Query.equal('status', 'published')
        ]
      );
      return tours.documents;
    } catch (error) {
      console.error('Error getting upcoming tours:', error);
      throw error;
    }
  }
} 