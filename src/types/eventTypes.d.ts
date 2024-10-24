import {Event, EventBookmarks, EventCategories, EventLikes } from "../entities/Event";


export type MutationResponse = {
    success?: boolean;
    message?: string;
    singleEvent?: Event | null;
    singleEventLike?:EventLikes | null
    singleEventBookmark?:EventBookmarks | null
    errorCode?: string;
    errorDetail?: string;
}

export type EventResponse = {
    success: boolean
    message: string
    events?: Event[] | null
    event?: Event | null
    eventLikes?: EventLikes[] | null
    eventLike?: EventLikes | null
    eventBookmarks?: EventBookmarks[] | null
    eventBookmark?: EventBookmarks | null
    errorCode?: String
    errorDetail?: String
}


export type EventType = {
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
    likes?: EventLikesType[];
    bookings: EventBookingsType[];
    bookmarks: EventBookmarksType[];
    ratings: EventRatingsType[];
    notifications: EventNotificationType[];
}

export type EventInputType = {
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


export type EventUpdatesType = {
    organizer: string;
    time: Date; // ISO format for timestamp
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

export type EventBookmarksType = {
    id: number;
    userId: string;
    event: EventType;
}


export type EventBookingsType = {
    id: number;
    event: EventType;
    userId: string;
    bookedDate: Date; // ISO format
    slotSet: string;
    slotsBooked: number;
}


export type EventLikesType = {
    id: number;
    event: EventType;
    user: UserType;
}


export type EventCategory = {
    id: number;
    categoryName: string;
    createdAt: Date; // ISO format
}

// Event Rating Entity
export type EventRatingsType = {
    id: number;
    event: Event;
    userId: string;
    scoreRating: number; // Range from 1.0 to 5.0
}

// Event Notification Entity
export type EventNotificationType = {
    id: number;
    event: Event;
    userId: string;
    content: string;
    status: string;
}

// User export Type (Assuming it's defined)
export type UserType = {
    id: number;
    name: string;
    email: string;
    // Add other fields as necessary
}

// Category export Type (if it's the same as EventCategory, unify them)
export type CategoryType = {
    id: number;
    categoryName: string;
}
