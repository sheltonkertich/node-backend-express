import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';

interface EventBookmarkData {
  userId: string;
  eventId: string;
}

export class EventBookmarkService {
  async bookmarkEvent(data: EventBookmarkData) {
    try {
      const bookmark = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.EVENT_BOOKMARKS,
        ID.unique(),
        {
          ...data,
          createdAt: new Date().toISOString(),
        }
      );
      return bookmark;
    } catch (error) {
      console.error('Error bookmarking event:', error);
      throw error;
    }
  }

  async removeBookmark(userId: string, eventId: string) {
    try {
      const bookmarks = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_BOOKMARKS,
        [
          Query.equal('userId', userId),
          Query.equal('eventId', eventId)
        ]
      );

      if (bookmarks.documents.length > 0) {
        await databases.deleteDocument(
          DATABASE_ID,
          COLLECTIONS.EVENT_BOOKMARKS,
          bookmarks.documents[0].$id
        );
      }
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }

  async getEventBookmarks(eventId: string) {
    try {
      const bookmarks = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_BOOKMARKS,
        [Query.equal('eventId', eventId)]
      );
      return bookmarks.documents;
    } catch (error) {
      console.error('Error getting event bookmarks:', error);
      throw error;
    }
  }

  async getUserBookmarks(userId: string) {
    try {
      const bookmarks = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_BOOKMARKS,
        [Query.equal('userId', userId)]
      );
      return bookmarks.documents;
    } catch (error) {
      console.error('Error getting user bookmarks:', error);
      throw error;
    }
  }

  async hasUserBookmarkedEvent(userId: string, eventId: string) {
    try {
      const bookmarks = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.EVENT_BOOKMARKS,
        [
          Query.equal('userId', userId),
          Query.equal('eventId', eventId)
        ]
      );
      return bookmarks.documents.length > 0;
    } catch (error) {
      console.error('Error checking if user bookmarked event:', error);
      throw error;
    }
  }
}