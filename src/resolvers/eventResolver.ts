import { services } from '../services';
import { GraphQLError } from 'graphql';

export const eventResolver = {
  Query: {
    events: async () => {
      return await services.eventService.getAllEvents();
    },
    event: async (_: any, { id }: { id: string }) => {
      const event = await services.eventService.getEventById(id);
      if (!event) {
        throw new GraphQLError('Event not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return event;
    },
    upcomingEvents: async () => {
      return await services.eventService.getUpcomingEvents();
    },
    eventsByCategory: async (_: any, { category }: { category: string }) => {
      return await services.eventService.getEventsByCategory(category);
    },
    eventsByOrganizer: async (_: any, { organizerId }: { organizerId: string }) => {
      return await services.eventService.getEventsByOrganizer(organizerId);
    }
  },

  Mutation: {
    createEvent: async (_: any, { input }: any) => {
      return await services.eventService.createEvent(input);
    },
    updateEvent: async (_: any, { id, input }: any) => {
      return await services.eventService.updateEvent(id, input);
    },
    deleteEvent: async (_: any, { id }: { id: string }) => {
      return await services.eventService.deleteEvent(id);
    },
    likeEvent: async (_: any, { userId, eventId }: { userId: string, eventId: string }) => {
      return await services.eventLikeService.likeEvent({ userId, eventId });
    },
    unlikeEvent: async (_: any, { userId, eventId }: { userId: string, eventId: string }) => {
      return await services.eventLikeService.unlikeEvent(userId, eventId);
    },
    bookmarkEvent: async (_: any, { userId, eventId }: { userId: string, eventId: string }) => {
      return await services.eventBookmarkService.bookmarkEvent({ userId, eventId });
    },
    removeBookmark: async (_: any, { userId, eventId }: { userId: string, eventId: string }) => {
      return await services.eventBookmarkService.removeBookmark(userId, eventId);
    }
  },

  Event: {
    organizer: async (parent: any) => {
      return await services.organizerService.getOrganizerById(parent.organizerId);
    },
    likes: async (parent: any) => {
      return await services.eventLikeService.getEventLikes(parent.$id);
    },
    bookmarks: async (parent: any) => {
      return await services.eventBookmarkService.getEventBookmarks(parent.$id);
    }
  }
}; 