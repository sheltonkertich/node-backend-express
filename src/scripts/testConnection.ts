import { Client, Databases, Models } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

type AttributeType = Models.AttributeString | 
                    Models.AttributeInteger | 
                    Models.AttributeFloat | 
                    Models.AttributeBoolean | 
                    Models.AttributeEmail | 
                    Models.AttributeEnum | 
                    Models.AttributeUrl | 
                    Models.AttributeIp | 
                    Models.AttributeDatetime;

async function testConnection() {
    try {
        const collections = await databases.listCollections(
            process.env.APPWRITE_DATABASE_ID!
        );
        
        console.log('Successfully connected to Appwrite!');
        console.log('Available collections:', collections.total);
        
        // Detailed collection info
        for (const collection of collections.collections) {
            console.log(`\nCollection: ${collection.name} (${collection.$id})`);
            
            // List attributes for each collection
            const attributes = await databases.listAttributes(
                process.env.APPWRITE_DATABASE_ID!,
                collection.$id
            );
            
            console.log('Attributes:');
            for (const attr of attributes.attributes as unknown as AttributeType[]) {
                console.log(`- ${attr.key}: ${attr.type} (${attr.required ? 'required' : 'optional'})`);
            }
        }

    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection(); 