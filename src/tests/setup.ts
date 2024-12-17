import dotenv from 'dotenv';
import { Client } from 'node-appwrite';

dotenv.config({ path: '.env.test' });

// Setup test client
export const testClient = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!); 