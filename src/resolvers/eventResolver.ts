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
import { EvenNotifictaionService } from "../services/eventNotificationService.js";
import { EventRatingService } from "../services/eventRatingService.js";

const eventService = new EventService(AppDataSource.getRepository(Event));

export const eventResolvers = {
  Query: {
    getEvents: async () => {
      return await eventService.getAllEvents();
    },
    getEvent: async (_: any, { id }: { id: number }) => {
      return await eventService.getEventById(id);
    },

    Mutation: {
      createEvent: async () => {
        // Implement logic to create an event
      },
      updateEvent: async () => {
        // Implement logic to update an event
      },
      deleteEvent: async () => {
        // Implement logic to delete an event
        return true;
      },
      // Other mutation resolvers
    },
    // Define resolvers for nested fields if necessary
  },
};
