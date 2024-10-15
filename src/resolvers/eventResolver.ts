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
import e from "express";

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
		getEvents: async (): Promise<Event[]> => {

			try {
				return await services.eventService.getAllEvents();
			} catch (error) {
				console.error("Error in getEvents resolver:", error);
				throw new Error("Could not retrieve events. Please try again later.");
			}
		},
		getEvent: async (_: any, { id }: { id: number }): Promise<Event | null> => {
			try {
				return await services.eventService.getEventById(id);
			} catch (error) {
				console.error(`Error in getEvent resolver for id ${id}:`, error);
				throw new Error("Could not retrieve the event. Please check the user ID and try again.");
			}
		},
		getAllLikes: async () => await services.likesService.getAllLikes(),
		getEventLike: async () => await services.likesService.getEventLike(1),
		// getBookmarks: async () => await services.bookmarkService.getAllBookmarks(),
		// getEventBookings: async () => await services.bookingsService.getAllBookings(),
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
					event: event,
				};
			} catch (error: any) {
				console.error("Error in CreatingEvent resolver:", error);
				const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
				const errorMessage = error.detail || 'default erreo An unexpected error occurred.';
				return {
					success: false,
					message: errorMessage,
					event: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				};
			}
		},
		updateEvent: async (_: any, { id, eventUpdates }: { id: number, eventUpdates: EventUpdates }): Promise<MutationResponse> => {
			try {
				console.log('eventUpdates in resolver:', eventUpdates);
				const updatedEvent = await services.eventService.updateEvent(id, eventUpdates);

				if (!updatedEvent) {
					return {
						success: false,
						message: `Event with id ${id} not found. Update failed.`,
						event: null,
					};
				}

				return {
					success: true,
					message: "Event updated successfully.",
					event: updatedEvent,
				};

			} catch (error: any) {
				console.error(`Error in updateEvent resolver for id ${id}:`, error);

				const errorCode = error.code || 'UNKNOWN_ERROR';
				const errorMessage = error.message || 'An unexpected error occurred.';

				return {
					success: false,
					message: errorMessage,
					event: null,
					errorCode: errorCode,
					errorDetail: error,
				};
			}
		},


		deleteEvent: async (_: any, { id }: { id: number }): Promise<MutationResponse> => {
			try {
				const deletedEvent = await services.eventService.deleteEvent(id);
				return {
					success: true,
					message: "Event deleted successfully.",
					event: deletedEvent,

				}; // Return a confirmation message or the deleted event
			} catch (error) {
				console.error("Error deleting event:", error);
				return {
					success: false,
					message: `Event with id ${id} not found. Delete failed.`,
					event: null,
				};

			}
		},
		// Other mutation resolvers

		createEventLike: async (_: any, { userId,eventId }: { userId: number, eventId: number }): Promise<MutationResponse> => {
			try {
				const event = await services.likesService.createLike(userId, eventId);
				return {
					success: true,
					message: "EventLike created successfully.",
					event: event,
				};
			} catch (error: any) {
				console.error("Error in CreatingEventLike resolver:", error);
				const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
				const errorMessage = error.detail || 'default erreo An unexpected error occurred.';
				return {
					success: false,
					message: errorMessage,
					event: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				};
			}
		},
	},
};
