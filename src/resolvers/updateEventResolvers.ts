import { services } from "../services/index.js";
import { MutationResponse, EventUpdatesType } from "../types/eventTypes.js";

export const updateEventResolvers = {
    Mutation:{
        updateEvent: async (_: any, { id, eventUpdates }: { id: number, eventUpdates: EventUpdatesType }): Promise<MutationResponse> => {
			try {
				const updatedEvent = await services.eventService.updateEvent(id, eventUpdates);

				if (!updatedEvent) {
					return {
						success: false,
						message: `Event with id ${id} not found. Update failed.`,
						singleEvent: null,
					};
				}

				return {
					success: true,
					message: "Event updated successfully.",
					singleEvent: updatedEvent,
				};

			} catch (error: any) {
				console.error(`Error in updateEvent resolver for id ${id}:`, error);

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