import { Client, Databases, Account, Storage, Functions } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

// Initialize Appwrite services
export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

// Constants
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
export const COLLECTIONS = {
    EVENTS: 'events',
    EVENT_LIKES: 'event_likes',
    EVENT_BOOKMARKS: 'event_bookmarks',
    USERS: 'users',
    ORGANIZERS: 'organizers'
} as const;

// Storage buckets
export const STORAGE_BUCKETS = {
    EVENT_IMAGES: 'event-images',
    USER_AVATARS: 'user-avatars',
    ORGANIZER_IMAGES: 'organizer-images'
} as const;

export default client;
