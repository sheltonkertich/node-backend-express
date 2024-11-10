import { services } from "../services/index.js";
import { EventInputType, MutationResponse } from "../types/eventTypes.js";
import { handleGraphQLError } from "../utils/handleError.js";

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
				return handleGraphQLError(error, { singleEvent: null });
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
				return handleGraphQLError(error, { singleEventLike: null });
				
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
				return handleGraphQLError(error, { singleEventBookmark: null });
			}
		},
		bookEventTicket: async (_: any, { slotId,slotName, userId, ticketType, quantity }: { slotId: number,slotName:string, userId: number, ticketType: string, quantity: number }): Promise<MutationResponse> => {
			try {
				const eventBooking = await services.ticketsService.createTicket( slotId,slotName, userId, ticketType, quantity);
				return {
					success: true,
					message: "Event Ticket created successfully.",
					singleTicket: eventBooking,
				};
			} catch (error: any) {
				return handleGraphQLError(error);

			}
		},
		createEventRating: async(_:any, { userId, eventId, scoreRating, review }: { userId: number, eventId: number, scoreRating: number, review: string }): Promise<MutationResponse> => {
			try {
				const eventRating = await services.ratingsService.createRating(userId, eventId, scoreRating, review);
				return {
					success: true,
					message: "Event Rated successfully.",
					singleRating: eventRating,
				};
			} catch (error: any) {
				return handleGraphQLError(error, { singleEventRating: null });
			}
		}

	},
};
