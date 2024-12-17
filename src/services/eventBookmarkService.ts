import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';
import { AppwriteEventBookmark, CreateInput } from '../types/appwrite';

export class EventBookmarkService {
    async createBookmark(userId: string, eventId: string) {
        try {
            const existingBookmark = await this.hasUserBookmarkedEvent(userId, eventId);
            if (existingBookmark) {
                throw new Error('Event already bookmarked');
            }

            const bookmarkData: CreateInput<AppwriteEventBookmark> = {
                userId,
                eventId
            };

            const bookmark = await databases.createDocument<AppwriteEventBookmark>(
                DATABASE_ID,
                COLLECTIONS.EVENT_BOOKMARKS,
                ID.unique(),
                bookmarkData
            );
            return bookmark;
        } catch (error) {
            console.error('Error creating bookmark:', error);
            throw error;
        }
    }

    async deleteBookmark(userId: string, eventId: string) {
        try {
            const bookmarks = await databases.listDocuments<AppwriteEventBookmark>(
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
            const bookmarks = await databases.listDocuments<AppwriteEventBookmark>(
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
            const bookmarks = await databases.listDocuments<AppwriteEventBookmark>(
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
            const bookmarks = await databases.listDocuments<AppwriteEventBookmark>(
                DATABASE_ID,
                COLLECTIONS.EVENT_BOOKMARKS,
                [
                    Query.equal('userId', userId),
                    Query.equal('eventId', eventId)
                ]
            );
            return bookmarks.documents.length > 0;
        } catch (error) {
            console.error('Error checking bookmark status:', error);
            throw error;
        }
    }
}