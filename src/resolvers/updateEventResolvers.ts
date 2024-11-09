import { services } from "../services/index.js";
import { MutationResponse, EventUpdatesType,SlotsUpdatesType } from "../types/eventTypes.js";
import { handleGraphQLError } from "../utils/handleError.js";

export const updateEventResolvers = {
    Mutation:{
        updateEvent: async (_: any, { eventId, eventUpdates, }: { eventId: number,eventUpdates: EventUpdatesType }): Promise<MutationResponse> => {
			try {
				const updatedEvent = await services.eventService.updateEvent(eventId,eventUpdates);

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
				return handleGraphQLError(error, { singleEvent: null });
			}
		},
		updateEventSlots: async (_: any, { eventId,slotName,slotUpdates }: { eventId: number,slotName:string,slotUpdates:SlotsUpdatesType}): Promise<MutationResponse> => {
			try {
				console.log("passed data is ",eventId,slotName)
				const updatedEventSlot = await services.slotsService.updateEventSlot(eventId,slotName,slotUpdates);
				if (!updatedEventSlot) {
					return {
						success: false,
						message: `slot with codename ${slotName} associated with event_id ${eventId} not found. Update failed.`,
						singleEvent: null,
					};
				}

				return {
					success: true,
					message: "Event Slots updated successfully.",
					singleSlot: updatedEventSlot,
				};

			} catch (error: any) {
				return handleGraphQLError(error, { singleSlot: null });
			}
		},

    }
}