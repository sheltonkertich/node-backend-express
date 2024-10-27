import {
	Event,
	EventBookings,
	EventCategories,
	EventLikes,
	EventRatings,
	EventNotifications,
	EventBookmarks,
	EventSlots
} from "../entities/Event.js";
import { User } from "../entities/User.js";
import { AppDataSource } from "../data-source.js";
import { EventService } from "./eventService.js";
import { EventBookingService } from "./eventBookingService.js";
import { EventBookmarkService } from "./eventBookmarkService.js";
import { EventLikeService } from "./eventLikeService.js";
import { EventNotificationService } from "./eventNotificationService.js";
import { EventRatingService } from "./eventRatingService.js";
import { EventCategoryService } from "./eventCategoryService.js";
import { EventSlotsService } from "./eventSlotsService.js";
import { UserService } from "./userService.js";

const repositories = {
	event: AppDataSource.getRepository(Event),
	eventBookings: AppDataSource.getRepository(EventBookings),
	eventCategories: AppDataSource.getRepository(EventCategories),
	eventLikes: AppDataSource.getRepository(EventLikes),
	eventSlots: AppDataSource.getRepository(EventSlots),
	eventRatings: AppDataSource.getRepository(EventRatings),
	eventNotifications: AppDataSource.getRepository(EventNotifications),
	eventBookmarks: AppDataSource.getRepository(EventBookmarks),
	userService: AppDataSource.getRepository(User)
};

export const services = {
	eventService: new EventService(repositories.event),
	bookmarkService: new EventBookmarkService(repositories.eventBookmarks),
	bookingsService: new EventBookingService(repositories.eventBookings),
	likesService: new EventLikeService(repositories.eventLikes),
	slotsService: new EventSlotsService(repositories.eventSlots),
	categoriesService: new EventCategoryService(repositories.eventCategories),
	ratingsService: new EventRatingService(repositories.eventRatings),
	notificationService: new EventNotificationService(repositories.eventNotifications),
	userService : new UserService(repositories.userService)
};