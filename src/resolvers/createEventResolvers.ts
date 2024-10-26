import { services } from "../services/index.js";
import { EventInputType, MutationResponse } from "../types/eventTypes.js";

export const createEventResolvers = {
	Mutation: {
		createEvent: async (_: any, { input }: { input: EventInputType }): Promise<MutationResponse> => {
			try {
				const event = await services.eventService.createEvent(input);
				return {
					success: true,
					message: "Event created successfully.",
					singleEvent: event,
				};
			} catch (error: any) {
				console.error("Error in CreatingEvent resolver:", error);
				const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
				const errorMessage = error.detail || 'default erreo An unexpected error occurred.';
				return {
					success: false,
					message: errorMessage,
					singleEvent: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				};
			}
		},


		// Other mutation resolvers

		createEventLike: async (_: any, { userId, eventId }: { userId: number, eventId: number }): Promise<MutationResponse> => {
			try {
				const eventLike = await services.likesService.createLike(userId, eventId);
				return {
					success: true,
					message: "EventLike created successfully.",
					singleEventLike: eventLike,
				};
			} catch (error: any) {
				console.error("Error in CreatingEventLike resolver:", error);
				const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
				const errorMessage = error.detail || 'default erreo An unexpected error occurred.';
				return {
					success: false,
					message: errorMessage,
					singleEventLike: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				};
			}
		},

		createEventBookmark: async (_: any, { userId, eventId }: { userId: number, eventId: number }): Promise<MutationResponse> => {
			try {
				const eventBookmark = await services.bookmarkService.createEventBookmark(userId, eventId);
				return {
					success: true,
					message: "EventBookmark created successfully.",
					singleEventBookmark: eventBookmark,
				};
			} catch (error: any) {
				console.error("Error in CreatingEventBookmark resolver:", error);
				const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
				const errorMessage = error.detail || 'default errer An unexpected error occurred.';
				return {
					success: false,
					message: errorMessage,
					singleEventBookmark: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				};
			}
		},

	},
};
