import { EventCategories } from "../entities/Event";

// Mutation Response
export interface MutationResponse {
    success: boolean;
    message: string;
    event: Event | null;
    errorCode?: string;
    errorDetail?: string;
}

// Event Type
export interface Event {
    id: number;
    organizer: string;
    time: Date; // ISO format for timestamp
    location: string;
    category: string;
    status: string;
    coverImage: string;
    description: string;
    cost: number;
    seatAvailable: number;
    createdAt: Date; // ISO format
    updatedAt: Date; // ISO format
    likes: EventLikes[];
    bookings: EventBookings[];
    bookmarks: EventBookmarks[];
    ratings: EventRatings[];
    notifications: EventNotification[];
}

// Event Input Type
export type EventInput = {
    organizer: string;
    location: string;
    categories: EventCategories[];
    status: string;
    coverImage: string;
    description: string;
    cost: number;
    seatAvailable: number;
    createdAt: Date; // ISO format
    updatedAt: Date; // ISO format
}

// Event Updates Type
export type EventUpdates = {
    organizer?: string;
    time?: Date; // ISO format for timestamp
    location?: string;
    categories?: EventCategories[];
    status?: string;
    coverImage?: string;
    description?: string;
    cost?: number;
    seatAvailable?: number;
    createdAt?: Date; // ISO format
    updatedAt?: Date; // ISO format
}

// Event Bookmark Entity
export interface EventBookmarks {
    id: number;
    userId: string;
    event: Event;
}

// Event Booking Entity
export interface EventBookings {
    id: number;
    event: Event;
    userId: string;
    bookedDate: Date; // ISO format
    slotSet: string;
    slotsBooked: number;
}

// Event Like Entity
export interface EventLikes {
    id: number;
    event: Event;
    userId: string;
}

// Event Category Entity
export interface EventCategory {
    id: number;
    categoryName: string;
    createdAt: Date; // ISO format
}

// Event Rating Entity
export interface EventRatings {
    id: number;
    event: Event;
    userId: string;
    scoreRating: number; // Range from 1.0 to 5.0
}

// Event Notification Entity
export interface EventNotification {
    id: number;
    event: Event;
    userId: string;
    content: string;
    status: string;
}

// User Type (Assuming it's defined)
export interface User {
    id: number;
    name: string;
    email: string;
    // Add other fields as necessary
}

// Category Type (if it's the same as EventCategory, unify them)
export interface Category {
    id: number;
    categoryName: string;
}
