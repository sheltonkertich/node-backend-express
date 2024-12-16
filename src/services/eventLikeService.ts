import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';

interface EventLikeData {
  userId: string;
  eventId: string;
}

export class EventLikeService {
  async likeEvent(data: EventLikeData) {
    try {
      const like = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.EVENT_LIKES,
        ID.unique(),
        {
          ...data,
          createdAt: new Date().toISOString(),
        }
      );
      return like;
    } catch (error) {
      console.error('Error liking event:', error);
      throw error;
    }
  }

  async unlikeEvent(userId: string, eventId: string) {
    try {
      const likes = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_LIKES,
        [
          Query.equal('userId', userId),
          Query.equal('eventId', eventId)
        ]
      );

      if (likes.documents.length > 0) {
        await databases.deleteDocument(
          DATABASE_ID,
          COLLECTIONS.EVENT_LIKES,
          likes.documents[0].$id
        );
      }
      return true;
    } catch (error) {
      console.error('Error unliking event:', error);
      throw error;
    }
  }

  async getEventLikes(eventId: string) {
    try {
      const likes = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_LIKES,
        [Query.equal('eventId', eventId)]
      );
      return likes.documents;
    } catch (error) {
      console.error('Error getting event likes:', error);
      throw error;
    }
  }

  async getUserLikes(userId: string) {
    try {
      const likes = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_LIKES,
        [Query.equal('userId', userId)]
      );
      return likes.documents;
    } catch (error) {
      console.error('Error getting user likes:', error);
      throw error;
    }
  }

  async hasUserLikedEvent(userId: string, eventId: string) {
    try {
      const likes = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_LIKES,
        [
          Query.equal('userId', userId),
          Query.equal('eventId', eventId)
        ]
      );
      return likes.documents.length > 0;
    } catch (error) {
      console.error('Error checking if user liked event:', error);
      throw error;
    }
  }
}