import {
	Event,
	EventBookings,
	EventCategories,
	EventLikes,
	EventRatings,
	EventNotifications,
	EventBookmarks,
} from "../entities/Event.js";
import { AppDataSource } from "../data-source.js";
import { EventService } from "../services/eventService.js";
import { EventBookingService } from "../services/eventBookingService.js";
import { EventBookmarkService } from "../services/eventBookmarkService.js";
import { EventLikeService } from "../services/eventLikeService.js";
import { EventNotificationService } from "../services/eventNotificationService.js";
import { EventRatingService } from "../services/eventRatingService.js";
import { EventCategoryService } from "../services/eventCategoryService.js";

const repositories = {
	event: AppDataSource.getRepository(Event),
	eventBookings: AppDataSource.getRepository(EventBookings),
	eventCategories: AppDataSource.getRepository(EventCategories),
	eventLikes: AppDataSource.getRepository(EventLikes),
	eventRatings: AppDataSource.getRepository(EventRatings),
	eventNotifications: AppDataSource.getRepository(EventNotifications),
	eventBookmarks: AppDataSource.getRepository(EventBookmarks),
};

const services = {
	eventService: new EventService(repositories.event),
	bookmarkService: new EventBookmarkService(repositories.eventBookmarks),
	bookingsService: new EventBookingService(repositories.eventBookings),
	likesService: new EventLikeService(repositories.eventLikes),
	categoriesService: new EventCategoryService(repositories.eventCategories),
	ratingsService: new EventRatingService(repositories.eventRatings),
	notificationService: new EventNotificationService(repositories.eventNotifications),
};

type EventType = {
	organizer: string;
	time: Date;
	location: string;
	category: string;
	status: string;
	coverImage: string;
	description: string;
	cost: number;
	seatAvailable: number;
};

type EventUpdates = {
	id: number;
	organizer: string;
	time: Date;
	location: string;
	category: string;
	status: string;
	coverImage: string;
	description: string;
	cost: number;
	seatAvailable: number;
	updatedAt: Date;
};

export const eventResolvers = {
	Query: {
		getEvents: async () => await services.eventService.getAllEvents(),
		getEvent: async (_: any, { id }: { id: number }) => await services.eventService.getEventById(id),
		// getBookmarks: async () => await services.bookmarkService.getAllBookmarks(),
		// getEventBookings: async () => await services.bookingsService.getAllBookings(),
		// getEventLikes: async () => await services.likesService.getAllLikes(),
		// getEventCategories: async () => await services.categoriesService.getAllCategories(),
		// getEventRatings: async () => await services.ratingsService.getAllRatings(),
		// getEventNotifications: async () => await services.notificationService.getAllNotifications(),
	},
	Mutation: {
		createEvent: async (_: any, eventData: EventType) => {
			try {
				return await services.eventService.createEvent(eventData);
			} catch (error) {
				console.error("Error creating event:", error);
				throw new Error("Failed to create event.");
			}
		},
		updateEvent: async (_: any, eventData: EventUpdates) => {
			try {
				const { id, ...updateData } = eventData;
				return await services.eventService.updateEvent(id, updateData);
			} catch (error) {
				console.error("Error updating event:", error);
				throw new Error("Failed to update event.");
			}
		},
		deleteEvent: async (_: any, { id }: { id: number }) => {
			try {
				// Implement logic to delete an event
				return true; // Return a confirmation message or the deleted event
			} catch (error) {
				console.error("Error deleting event:", error);
				throw new Error("Failed to delete event.");
			}
		},
		// Other mutation resolvers
	},
};
