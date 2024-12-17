import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';
import { AppwriteEventLike, CreateInput } from '../types/appwrite';

export class EventLikeService {
    async createLike(userId: string, eventId: string) {
        try {
            const existingLike = await this.hasUserLikedEvent(userId, eventId);
            if (existingLike) {
                throw new Error('User has already liked this event');
            }

            const likeData: CreateInput<AppwriteEventLike> = {
                userId,
                eventId
            };

            const like = await databases.createDocument<AppwriteEventLike>(
                DATABASE_ID,
                COLLECTIONS.EVENT_LIKES,
                ID.unique(),
                likeData
            );
            return like;
        } catch (error) {
            console.error('Error creating event like:', error);
            throw error;
        }
    }

    async deleteLike(userId: string, eventId: string) {
        try {
            const likes = await databases.listDocuments<AppwriteEventLike>(
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
            console.error('Error removing like:', error);
            throw error;
        }
    }

    async getEventLikes(eventId: string) {
        try {
            const likes = await databases.listDocuments<AppwriteEventLike>(
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
            const likes = await databases.listDocuments<AppwriteEventLike>(
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
            const likes = await databases.listDocuments<AppwriteEventLike>(
                DATABASE_ID,
                COLLECTIONS.EVENT_LIKES,
                [
                    Query.equal('userId', userId),
                    Query.equal('eventId', eventId)
                ]
            );
            return likes.documents.length > 0;
        } catch (error) {
            console.error('Error checking like status:', error);
            throw error;
        }
    }
}