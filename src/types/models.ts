import { Models } from 'node-appwrite';

export interface AppwriteUser extends Models.Document {
    email: string;
    name: string;
    avatar?: string;
    preferences?: {
        [key: string]: any;
    };
}

export interface AppwriteOrganizer extends Models.Document {
    email: string;
    name: string;
    description?: string;
    logo?: string;
    website?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}

export interface AppwriteEvent extends Models.Document {
    title: string;
    description: string;
    image?: string;
    organizerId: string;
    startDate: string;
    endDate: string;
    location: string;
    price: number;
    capacity: number;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    category: string;
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
    avatar?: string;
}

export interface CreateOrganizerInput {
    email: string;
    name: string;
    password: string;
    description?: string;
    logo?: string;
    website?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}

export interface CreateEventInput {
    title: string;
    description: string;
    image?: string;
    organizerId: string;
    startDate: string;
    endDate: string;
    location: string;
    price: number;
    capacity: number;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    category: string;
} 