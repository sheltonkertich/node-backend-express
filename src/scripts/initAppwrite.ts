import { Client, Databases, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';

async function createCollection(collectionId: string, name: string) {
    try {
        await databases.createCollection(
            DATABASE_ID,
            collectionId,
            name,
            [
                Permission.read(Role.any()), // read permission for any user
                Permission.write(Role.team("admin")) // write permission for admin team only
            ]
        );
        console.log(`Created collection: ${name}`);
    } catch (error: any) {
        if (error.code !== 409) { // Skip if collection already exists
            console.error(`Error creating collection ${name}:`, error);
        }
    }
}

async function createAttribute(
    collectionId: string,
    key: string,
    type: 'string' | 'integer' | 'float' | 'boolean' | 'email' | 'url' | 'datetime',
    required: boolean,
    array: boolean = false,
    size?: number,
    defaultValue?: any
) {
    try {
        if (array) {
            await databases.createStringAttribute(
                DATABASE_ID,
                collectionId,
                key,
                size || 255,
                required,
                defaultValue,
                true
            );
        } else {
            switch (type) {
                case 'string':
                    await databases.createStringAttribute(
                        DATABASE_ID,
                        collectionId,
                        key,
                        size || 255,
                        required,
                        defaultValue
                    );
                    break;
                case 'integer':
                    await databases.createIntegerAttribute(
                        DATABASE_ID,
                        collectionId,
                        key,
                        required,
                        defaultValue
                    );
                    break;
                case 'float':
                    await databases.createFloatAttribute(
                        DATABASE_ID,
                        collectionId,
                        key,
                        required,
                        defaultValue
                    );
                    break;
                case 'boolean':
                    await databases.createBooleanAttribute(
                        DATABASE_ID,
                        collectionId,
                        key,
                        required,
                        defaultValue
                    );
                    break;
                case 'email':
                    await databases.createEmailAttribute(
                        DATABASE_ID,
                        collectionId,
                        key,
                        required,
                        defaultValue
                    );
                    break;
                case 'url':
                    await databases.createUrlAttribute(
                        DATABASE_ID,
                        collectionId,
                        key,
                        required,
                        defaultValue
                    );
                    break;
                case 'datetime':
                    await databases.createDatetimeAttribute(
                        DATABASE_ID,
                        collectionId,
                        key,
                        required,
                        defaultValue
                    );
                    break;
            }
        }
        console.log(`Created attribute: ${key} in collection ${collectionId}`);
    } catch (error: any) {
        if (error.code !== 409) { // Skip if attribute already exists
            console.error(`Error creating attribute ${key}:`, error);
        }
    }
}

async function initializeCollections() {
    // Users Collection
    await createCollection('users', 'Users');
    await createAttribute('users', 'name', 'string', true);
    await createAttribute('users', 'email', 'email', true);
    await createAttribute('users', 'imageUrl', 'url', false);
    await createAttribute('users', 'createdAt', 'datetime', true);
    await createAttribute('users', 'updatedAt', 'datetime', true);

    // Events Collection
    await createCollection('events', 'Events');
    await createAttribute('events', 'title', 'string', true);
    await createAttribute('events', 'description', 'string', true, false, 5000);
    await createAttribute('events', 'category', 'string', true);
    await createAttribute('events', 'location', 'string', true);
    await createAttribute('events', 'startDate', 'datetime', true);
    await createAttribute('events', 'endDate', 'datetime', true);
    await createAttribute('events', 'price', 'float', true);
    await createAttribute('events', 'capacity', 'integer', true);
    await createAttribute('events', 'imageUrl', 'url', false);
    await createAttribute('events', 'organizerId', 'string', true);
    await createAttribute('events', 'createdAt', 'datetime', true);
    await createAttribute('events', 'updatedAt', 'datetime', true);

    // Tours Collection
    await createCollection('tours', 'Tours');
    await createAttribute('tours', 'title', 'string', true);
    await createAttribute('tours', 'description', 'string', true, false, 5000);
    await createAttribute('tours', 'category', 'string', true);
    await createAttribute('tours', 'location', 'string', true);
    await createAttribute('tours', 'startDate', 'datetime', true);
    await createAttribute('tours', 'endDate', 'datetime', true);
    await createAttribute('tours', 'price', 'float', true);
    await createAttribute('tours', 'capacity', 'integer', true);
    await createAttribute('tours', 'imageUrl', 'url', false);
    await createAttribute('tours', 'organizerId', 'string', true);
    await createAttribute('tours', 'createdAt', 'datetime', true);
    await createAttribute('tours', 'updatedAt', 'datetime', true);

    // Event Likes Collection
    await createCollection('event_likes', 'Event Likes');
    await createAttribute('event_likes', 'userId', 'string', true);
    await createAttribute('event_likes', 'eventId', 'string', true);
    await createAttribute('event_likes', 'createdAt', 'datetime', true);

    // Event Bookmarks Collection
    await createCollection('event_bookmarks', 'Event Bookmarks');
    await createAttribute('event_bookmarks', 'userId', 'string', true);
    await createAttribute('event_bookmarks', 'eventId', 'string', true);
    await createAttribute('event_bookmarks', 'createdAt', 'datetime', true);

    // Organizers Collection
    await createCollection('organizers', 'Organizers');
    await createAttribute('organizers', 'name', 'string', true);
    await createAttribute('organizers', 'email', 'email', true);
    await createAttribute('organizers', 'phone', 'string', false);
    await createAttribute('organizers', 'description', 'string', false, false, 2000);
    await createAttribute('organizers', 'imageUrl', 'url', false);
    await createAttribute('organizers', 'createdAt', 'datetime', true);
    await createAttribute('organizers', 'updatedAt', 'datetime', true);
}

// Run the initialization
initializeCollections()
    .then(() => {
        console.log('Successfully initialized Appwrite collections');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error initializing Appwrite collections:', error);
        process.exit(1);
    }); 