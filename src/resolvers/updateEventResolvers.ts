import { services } from "../services/index.js";
import { MutationResponse, EventUpdatesType, SlotsUpdatesType } from "../types/eventTypes.js";
import { BaseResolver } from "./baseResolver.js";

export class UpdateEventResolver extends BaseResolver {
  static Mutation = {
    updateEvent: async (
      _: any,
      { eventId, eventUpdates }: { eventId: number; eventUpdates: EventUpdatesType }
    ): Promise<MutationResponse> => {
      return this.executeResolver<MutationResponse>(async () => {
        const numericId = this.validateId(eventId);
        const sanitizedUpdates = this.sanitizeInput(eventUpdates);
        const updatedEvent = await services.eventService.updateEvent(numericId, sanitizedUpdates);
        return {
          singleEvent: updatedEvent,
          message: "Event updated successfully"
        };
      });
    },

    updateEventSlots: async (
      _: any,
      { eventId, slotName, slotUpdates }: { 
        eventId: number; 
        slotName: string; 
        slotUpdates: SlotsUpdatesType 
      }
    ): Promise<MutationResponse> => {
      return this.executeResolver<MutationResponse>(async () => {
        const numericId = this.validateId(eventId);
        const sanitizedUpdates = this.sanitizeInput(slotUpdates);
        const updatedSlot = await services.slotsService.updateEventSlot(
          numericId,
          slotName,
          sanitizedUpdates
        );
        return {
          singleSlot: updatedSlot,
          message: "Event slot updated successfully"
        };
      });
    },

    updateNotificationStatus: async (
      _: any,
      { id, status }: { id: number; status: string }
    ): Promise<MutationResponse> => {
      return this.executeResolver<MutationResponse>(async () => {
        const numericId = this.validateId(id);
        const updatedNotification = await services.notificationService.updateNotificationStatus(
          numericId,
          status
        );
        return {
          singleNotification: updatedNotification,
          message: "Notification status updated successfully"
        };
      });
    },

    updateEventRating: async (
      _: any,
      { id, scoreRating, review }: { id: number; scoreRating: number; review: string }
    ): Promise<MutationResponse> => {
      return this.executeResolver<MutationResponse>(async () => {
        const numericId = this.validateId(id);
        const updatedRating = await services.ratingsService.updateRating(
          numericId,
          scoreRating,
          review
        );
        return {
          singleRating: updatedRating,
          message: "Event rating updated successfully"
        };
      });
    }
  };
}

export const updateEventResolvers = {
  Mutation: UpdateEventResolver.Mutation
};