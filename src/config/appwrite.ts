import { Client, Databases, Account, Storage } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'http://localhost/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';
export const COLLECTIONS = {
    USERS: 'users',
    USER_PROFILES: 'user_profiles',
    EVENTS: 'events',
    EVENT_LIKES: 'event_likes',
    EVENT_BOOKMARKS: 'event_bookmarks',
    TOURS: 'tours',
    ORGANIZERS: 'organizers'
};
