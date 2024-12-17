import { Models } from 'node-appwrite';

export enum TicketType {
    NORMAL = 'NORMAL',
    VIP = 'VIP',
    VVIP = 'VVIP'
}

export interface AppwriteEvent extends Models.Document {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    price: number;
    capacity: number;
    imageUrl?: string;
    organizerId: string;
    category: string;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
}

export interface AppwriteUser extends Models.Document {
    email: string;
    name: string;
    imageUrl?: string;
}

export interface AppwriteEventLike extends Models.Document {
    userId: string;
    eventId: string;
}

export interface AppwriteEventBookmark extends Models.Document {
    userId: string;
    eventId: string;
}

export interface AppwriteOrganizer extends Models.Document {
    name: string;
    email: string;
    phone?: string;
    description?: string;
    imageUrl?: string;
}

// Type for creating new documents (omitting Appwrite system fields)
export type CreateInput<T extends Models.Document> = Omit<T, keyof Models.Document>;

// Type for updating existing documents
export type UpdateInput<T extends Models.Document> = Partial<CreateInput<T>>; 