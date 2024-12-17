import { ID, Query, Permission, Role, Databases } from 'node-appwrite';
import { databases, storage, DATABASE_ID, COLLECTIONS, STORAGE_BUCKETS } from '../config/appwrite';

async function checkAndCreateAttribute(collectionId: string, key: string, createFn: () => Promise<any>) {
    try {
        const attributes = await databases.listAttributes(DATABASE_ID, collectionId);
        const exists = attributes.attributes.some((attr: any) => attr.key === key);
        if (!exists) {
            console.log(`Creating attribute ${key} in collection ${collectionId}...`);
            await createFn();
        } else {
            console.log(`Attribute ${key} already exists in collection ${collectionId}`);
        }
    } catch (error) {
        console.error(`Error handling attribute ${key}:`, error);
    }
}

async function checkAndCreateIndex(collectionId: string, key: string, createFn: () => Promise<any>) {
    try {
        const indexes = await databases.listIndexes(DATABASE_ID, collectionId);
        const exists = indexes.indexes.some((index: any) => index.key === key);
        if (!exists) {
            console.log(`Creating index ${key} in collection ${collectionId}...`);
            await createFn();
        } else {
            console.log(`Index ${key} already exists in collection ${collectionId}`);
        }
    } catch (error) {
        console.error(`Error handling index ${key}:`, error);
    }
}

async function checkAndCreateBucket(bucketId: string, name: string, mimeTypes: string[]) {
    try {
        try {
            await storage.getBucket(bucketId);
            console.log(`Bucket ${name} already exists`);
        } catch {
            console.log(`Creating bucket ${name}...`);
            await storage.createBucket(
                bucketId,
                name,
                [Permission.read(Role.any()), Permission.write(Role.any())],
                false,  // enabled
                undefined,  // maximumFileSize
                undefined,  // allowedFileExtensions
                undefined,  // compression
                undefined,  // encryption
                undefined   // antivirus
            );
        }
    } catch (error) {
        console.error(`Error handling bucket ${name}:`, error);
    }
}

async function initializeAppwrite() {
    try {
        // Add attributes to Events collection
        console.log('Checking Events collection attributes...');
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'title', 
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'title', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'description',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'description', 5000, true));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'image',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'image', 255, false));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'organizerId',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'organizerId', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'startDate',
            () => databases.createDatetimeAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'startDate', true));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'endDate',
            () => databases.createDatetimeAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'endDate', true));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'location',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'location', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'price',
            () => databases.createFloatAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'price', true));
        await checkAndCreateAttribute(COLLECTIONS.EVENTS, 'capacity',
            () => databases.createIntegerAttribute(DATABASE_ID, COLLECTIONS.EVENTS, 'capacity', true));

        // Add attributes to Event Likes collection
        console.log('Checking Event Likes collection attributes...');
        await checkAndCreateAttribute(COLLECTIONS.EVENT_LIKES, 'eventId',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENT_LIKES, 'eventId', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.EVENT_LIKES, 'userId',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENT_LIKES, 'userId', 255, true));

        // Add attributes to Event Bookmarks collection
        console.log('Checking Event Bookmarks collection attributes...');
        await checkAndCreateAttribute(COLLECTIONS.EVENT_BOOKMARKS, 'eventId',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENT_BOOKMARKS, 'eventId', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.EVENT_BOOKMARKS, 'userId',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.EVENT_BOOKMARKS, 'userId', 255, true));

        // Add attributes to Users collection
        console.log('Checking Users collection attributes...');
        await checkAndCreateAttribute(COLLECTIONS.USERS, 'email',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, 'email', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.USERS, 'name',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, 'name', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.USERS, 'avatar',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, 'avatar', 255, false));

        // Add attributes to Organizers collection
        console.log('Checking Organizers collection attributes...');
        await checkAndCreateAttribute(COLLECTIONS.ORGANIZERS, 'email',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.ORGANIZERS, 'email', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.ORGANIZERS, 'name',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.ORGANIZERS, 'name', 255, true));
        await checkAndCreateAttribute(COLLECTIONS.ORGANIZERS, 'description',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.ORGANIZERS, 'description', 5000, false));
        await checkAndCreateAttribute(COLLECTIONS.ORGANIZERS, 'logo',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.ORGANIZERS, 'logo', 255, false));
        await checkAndCreateAttribute(COLLECTIONS.ORGANIZERS, 'website',
            () => databases.createStringAttribute(DATABASE_ID, COLLECTIONS.ORGANIZERS, 'website', 255, false));

        // Create indexes
        console.log('Checking indexes...');

        // Event indexes
        await checkAndCreateIndex(COLLECTIONS.EVENTS, 'title_index',
            () => databases.createIndex(DATABASE_ID, COLLECTIONS.EVENTS, 'title_index', Databases.arguments.key, ['title']));
        await checkAndCreateIndex(COLLECTIONS.EVENTS, 'organizer_index',
            () => databases.createIndex(DATABASE_ID, COLLECTIONS.EVENTS, 'organizer_index', Databases.arguments.fullText, ['organizerId']));
        await checkAndCreateIndex(COLLECTIONS.EVENTS, 'date_index',
            () => databases.createIndex(DATABASE_ID, COLLECTIONS.EVENTS, 'date_index', Databases.arguments.key, ['startDate', 'endDate']));

        // Like/Bookmark indexes
        await checkAndCreateIndex(COLLECTIONS.EVENT_LIKES, 'event_user_index',
            () => databases.createIndex(DATABASE_ID, COLLECTIONS.EVENT_LIKES, 'event_user_index', Databases.arguments.key, ['eventId', 'userId']));
        await checkAndCreateIndex(COLLECTIONS.EVENT_BOOKMARKS, 'event_user_index',
            () => databases.createIndex(DATABASE_ID, COLLECTIONS.EVENT_BOOKMARKS, 'event_user_index', Databases.arguments.key, ['eventId', 'userId']));

        // User/Organizer indexes
        await checkAndCreateIndex(COLLECTIONS.USERS, 'email_index',
            () => databases.createIndex(DATABASE_ID, COLLECTIONS.USERS, 'email_index', Databases.arguments.key, ['email']));
        await checkAndCreateIndex(COLLECTIONS.ORGANIZERS, 'email_index',
            () => databases.createIndex(DATABASE_ID, COLLECTIONS.ORGANIZERS, 'email_index', Databases.arguments.key, ['email']));

        // Check and create storage buckets
        console.log('Checking storage buckets...');
        await checkAndCreateBucket(STORAGE_BUCKETS.EVENT_IMAGES, 'Event Images', ['image/jpeg', 'image/png', 'image/webp']);
        await checkAndCreateBucket(STORAGE_BUCKETS.USER_AVATARS, 'User Avatars', ['image/jpeg', 'image/png', 'image/webp']);
        await checkAndCreateBucket(STORAGE_BUCKETS.ORGANIZER_IMAGES, 'Organizer Images', ['image/jpeg', 'image/png', 'image/webp']);

        console.log('Appwrite initialization completed successfully!');
    } catch (error) {
        console.error('Error initializing Appwrite:', error);
    }
}

initializeAppwrite(); 