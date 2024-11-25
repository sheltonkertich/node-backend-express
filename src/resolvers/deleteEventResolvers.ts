import { services } from "../services/index.js";
import { MutationResponse } from "../types/eventTypes.js";
import { BaseResolver } from "./baseResolver.js";

export class DeleteEventResolver extends BaseResolver {
  static Mutation = {
    deleteEvent: async (
      _: any, 
      { id }: { id: number }
    ): Promise<MutationResponse> => {
      return this.executeResolver<MutationResponse>(async () => {
        const numericId = this.validateId(id);
        const deletedEvent = await services.eventService.deleteEvent(numericId);
        return {
          singleEvent: deletedEvent,
          message: `Event with id ${id} deleted successfully`
        };
      });
    },

    deleteLike: async (
      _: any, 
      { eventId, userId, id }: { eventId: number; userId: number; id: number }
    ): Promise<MutationResponse> => {
      return this.executeResolver<MutationResponse>(async () => {
        const like = await services.likesService.getEventLike(eventId, userId, id);
        if (like) {
          await services.likesService.deleteLike(id);
        }
        return {
          singleEventLike: like,
          message: `Event like with id ${id} deleted successfully`
        };
      });
    },

    deleteEventBookmark: async (
      _: any, 
      { eventId, userId, id }: { eventId: number; userId: number; id: number }
    ): Promise<MutationResponse> => {
      return this.executeResolver<MutationResponse>(async () => {
        const bookmark = await services.bookmarkService.getBookmark(eventId, userId, id);
        if (bookmark) {
          await services.bookmarkService.deleteBookmark(id);
        }
        return {
          singleEventBookmark: bookmark,
          message: `Event bookmark with id ${id} deleted successfully`
        };
      });
    },
  };
}

export const deleteEventResolver = {
  Mutation: DeleteEventResolver.Mutation
};