import { services } from "../services/index.js";
import { MutationResponse, EventUpdatesType,SlotsUpdatesType } from "../types/eventTypes.js";

export const updateEventResolvers = {
    Mutation:{
        updateEvent: async (_: any, { eventId,slotName,slotUpdates, eventUpdates, }: { eventId: number,slotName:string,slotUpdates:SlotsUpdatesType, eventUpdates: EventUpdatesType }): Promise<MutationResponse> => {
			try {
				const updatedEvent = await services.eventService.updateEvent(eventId,slotName,slotUpdates, eventUpdates);

				if (!updatedEvent) {
					return {
						success: false,
						message: `Event with id ${eventId} not found. Update failed.`,
						singleEvent: null,
					};
				}

				return {
					success: true,
					message: "Event updated successfully.",
					singleEvent: updatedEvent,
				};

			} catch (error: any) {
				console.error(`Error in updateEvent resolver for id ${eventId}:`, error);

				const errorCode = error.code || 'UNKNOWN_ERROR';
				const errorMessage = error.message || 'An unexpected error occurred.';

				return {
					success: false,
					message: errorMessage,
					singleEvent: null,
					errorCode: errorCode,
					errorDetail: error,
				};
			}
		},

    }
}