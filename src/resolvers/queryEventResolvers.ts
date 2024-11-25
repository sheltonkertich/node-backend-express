import { services } from "../services/index.js";
import { EventResponse } from "../types/eventTypes.js";
import { BaseResolver } from "./baseResolver.js";

export class QueryEventResolver extends BaseResolver {
  static Query = {
    getEvents: async (): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const events = await services.eventService.getAllEvents();
        return {
          events,
          message: events.length ? "Events found" : "No events found"
        };
      });
    },

    getEvent: async (_: any, { id }: { id: number }): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const numericId = this.validateId(id);
        const event = await services.eventService.getEventById(numericId);
        return {
          event,
          message: "Event fetched successfully"
        };
      });
    },

    getAllLikes: async (): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const likes = await services.likesService.getAllLikes();
        return {
          eventLikes: likes,
          message: likes.length ? "Event likes found" : "No event likes found"
        };
      });
    },

    getEventLike: async (
      _: any,
      { eventID, userID, id }: { eventID: number; userID: number; id: number }
    ): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const eventLike = await services.likesService.getEventLike(eventID, userID, id);
        return {
          eventLike,
          message: eventLike ? "Event like found" : "No like found"
        };
      });
    },

    getAllEventBookmarks: async (): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const bookmarks = await services.bookmarkService.getBookmarks();
        return {
          eventBookmarks: bookmarks,
          message: bookmarks.length ? "Event bookmarks found" : "No bookmarks found"
        };
      });
    },

    getEventBookmark: async (
      _: any,
      { eventID, userID, id }: { eventID: number; userID: number; id: number }
    ): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const bookmark = await services.bookmarkService.getBookmark(eventID, userID, id);
        return {
          eventBookmark: bookmark,
          message: bookmark ? "Event bookmark found" : "No bookmark found"
        };
      });
    },

    getAllslots: async (): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const slots = await services.slotsService.getEventSlots();
        return {
          allSlots: slots,
          message: slots.length ? "Event slots found" : "No event slots found"
        };
      });
    },

    getEventSlot: async (
      _: any,
      { id, codeName }: { id: number; codeName: string }
    ): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const slot = await services.slotsService.getEventSlot(id, codeName);
        return {
          eventSlot: slot,
          message: slot ? "Event slot found" : `No slot found for codename ${codeName} or id ${id}`
        };
      });
    },

    getAllCategories: async (): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const categories = await services.categoryService.getAllCategories();
        return {
          categories,
          message: categories.length ? "Event categories found" : "No event categories found"
        };
      });
    },
    getCategory: async (
      _: any,
      { id }: { id: number }
    ): Promise<EventResponse> => {
      return this.executeResolver<EventResponse>(async () => {
        const category = await services.categoryService.getCategoryById(id);
        return {
          category,
          message: category ? "Event category found" : "No event category found"
        };
      });
    }
  };
}

export const queryEventResolvers = {
  Query: QueryEventResolver.Query
};

