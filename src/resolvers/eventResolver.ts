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
import { EventInput, MutationResponse, EventUpdates } from "../types/eventTypes.js";

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
	    createEvent: async (_: any, { input }: { input: EventInput }): Promise<MutationResponse> => {
			try {
			  const event = await services.eventService.createEvent(input);
			  return {
				success: true,
				message: "Event created successfully.",
				event,
			  };
			} catch (error:any) {
			  console.error("Error in CreatingEvent resolver:", error);
			  const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
			  const errorMessage = error.message || 'An unexpected error occurred.';
			  return {
				success: false,
				message: errorMessage,
				event: null,
				errorCode: errorCode,
				errorDetail: error, // Optionally include the full error object for more details
			  };
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
