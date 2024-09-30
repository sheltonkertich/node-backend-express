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

const eventService = new EventService(AppDataSource.getRepository(Event));
const bookmarkService = new EventBookmarkService(AppDataSource.getRepository(EventBookmarks));
const bookingsService = new EventBookingService(AppDataSource.getRepository(EventBookings));
const likesService = new EventLikeService(AppDataSource.getRepository(EventLikes));
const categoriesService = new EventCategoryService(AppDataSource.getRepository(EventCategories));
const ratingsService = new EventRatingService(AppDataSource.getRepository(EventRatings));
const notificationService = new EventNotificationService(AppDataSource.getRepository(EventNotifications));

export const eventResolvers = {
  Query: {
    getEvents: async () => await eventService.getAllEvents(),
    getEvent: async (_:any, { id }:{id:number}) => await eventService.getEventById(id),
    getBookmarks: async () => await bookmarkService.getAllBookmarks(),
    getEventBookings: async () => await bookingsService.getAllBookings(),
    getEventLikes: async () => await likesService.getAllLikes(),
    getEventCategories: async () => await categoriesService.getAllCategories(),
    getEventRatings: async () => await ratingsService.getAllRatings(),
    getEventNotifications: async () => await notificationService.getAllNotifications(),
  },
  Mutation: {
    createEvent: async (_:any, { input }:any) => {
      // Implement logic to create an event
      // Return the created event
    },
    updateEvent: async (_:any, { id, input }:any) => {
      // Implement logic to update an event
      // Return the updated event
    },
    deleteEvent: async (_:any, { id }:any) => {
      // Implement logic to delete an event
      return true; // You may want to return the deleted event or a confirmation message
    },
    // Other mutation resolvers
  },
  // Define resolvers for nested fields if necessary
};
