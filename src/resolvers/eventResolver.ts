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
import { Timestamp } from "typeorm";

const eventService = new EventService(AppDataSource.getRepository(Event));
const bookmarkService = new EventBookmarkService(
	AppDataSource.getRepository(EventBookmarks)
);
const bookingsService = new EventBookingService(
	AppDataSource.getRepository(EventBookings)
);
const likesService = new EventLikeService(
	AppDataSource.getRepository(EventLikes)
);
const categoriesService = new EventCategoryService(
	AppDataSource.getRepository(EventCategories)
);
const ratingsService = new EventRatingService(
	AppDataSource.getRepository(EventRatings)
);
const notificationService = new EventNotificationService(
	AppDataSource.getRepository(EventNotifications)
);

type EventType = {
	organizer: string;
	time: any;
	location: string;
	category: string;
	status: string;
	coverImage: string;
	description: string;
	cost: number;
	seatAvailable: number;
};

type EventUpdates = {
	id: number; // Changed `id!` to `number`
	organizer: string;
	time: string;
	location: string;
	category: string;
	status: string;
	coverImage: string;
	description: string;
	cost: number; // Changed `float` to `number`
	seatAvailable: number; // Changed `Int` to `number`
	updatedAt: string;
};

export const eventResolvers = {
	Query: {
		getEvents: async () => await eventService.getAllEvents(),
		getEvent: async (_: any, { id }: { id: number }) =>
			await eventService.getEventById(id),
		getBookmarks: async () => await bookmarkService.getAllBookmarks(),
		getEventBookings: async () => await bookingsService.getAllBookings(),
		getEventLikes: async () => await likesService.getAllLikes(),
		getEventCategories: async () => await categoriesService.getAllCategories(),
		getEventRatings: async () => await ratingsService.getAllRatings(),
		getEventNotifications: async () => await notificationService.getAllNotifications(),
	},
	Mutation: {
		createEvent: async (
			_: any,
			{
				organizer,
				time,
				location,
				category,
				status,
				coverImage,
				description,
				cost,
				seatAvailable,
			}: EventType
		) => {
			return await eventService.createEvent({
				organizer,
				time,
				location,
				category,
				status,
				coverImage,
				description,
				cost,
				seatAvailable,
			});
		},
		updateEvent: async (_: any, { id, ...eventData }: EventUpdates) => {
			return await eventService.updateEvent(id, eventData); // Removed unnecessary `{eventData}`
		},
		deleteEvent: async (_: any, { id }: any) => {
			// Implement logic to delete an event
			return true; // You may want to return the deleted event or a confirmation message
		},
		// Other mutation resolvers
	},
	// Define resolvers for nested fields if necessary
};
