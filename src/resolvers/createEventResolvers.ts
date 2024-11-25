import { services } from "../services/index.js";
import { EventInputType, MutationResponse, CategoryResponse } from "../types/eventTypes.js";
import { BaseResolver } from "./baseResolver.js";
import { TicketType } from "../entities/Event.js";

export class CreateEventResolver extends BaseResolver {
	static Mutation = {
		createEvent: async (
			_: any, 
			{ input }: { input: EventInputType }
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				this.validateRequiredFields(input, [
					'organizer',
					'time',
					'location',
					'status',
					'description',
					'cost',
				]);

				let categories = [];
				if (input.categories?.length) {
					const categoryIds = input.categories.map(cat => cat.id);
					categories = await services.categoryService.getCategoriesByIds(categoryIds);
				}

				const sanitizedInput = this.sanitizeInput({
					...input,
					categories
				});

				const event = await services.eventService.createEvent(sanitizedInput);
				return {
						singleEvent: event,
						message: "Event created successfully"
				};
			});
		},

		createEventLike: async (
			_: any, 
			{ userId, eventId }: { userId: number; eventId: number }
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				const numericUserId = this.validateId(userId);
				const numericEventId = this.validateId(eventId);
				const eventLike = await services.likesService.createLike(
					numericUserId, 
					numericEventId
				);
				return {
					singleEventLike: eventLike,
					message: "Event like created successfully"
				};
			});
		},

		createEventBookmark: async (
			_: any, 
			{ userId, eventId }: { userId: number; eventId: number }
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				const numericUserId = this.validateId(userId);
				const numericEventId = this.validateId(eventId);
				const eventBookmark = await services.bookmarkService.createEventBookmark(
					numericUserId, 
					numericEventId
				);
				return {
					singleEventBookmark: eventBookmark,
					message: "Event bookmark created successfully"
				};
			});
		},

		bookEventTicket: async (
			_: any, 
			{ 
				slotId, 
				slotName, 
				userId, 
				ticketType, 
				quantity 
			}: { 
				slotId: number; 
				slotName: string; 
				userId: number; 
				ticketType: keyof typeof TicketType; 
					quantity: number 
			}
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				const numericSlotId = this.validateId(slotId);
				const numericUserId = this.validateId(userId);
				
				this.validateRequiredFields(
					{ slotName, ticketType, quantity },
					['slotName', 'ticketType', 'quantity']
				);

				if (quantity <= 0) {
					throw new Error('Quantity must be greater than 0');
				}

				const eventTicket = await services.ticketsService.createTicket(
					numericSlotId,
					slotName,
					numericUserId,
					ticketType,
					quantity
				);

				return {
					singleTicket: eventTicket,
					message: "Event ticket created successfully"
				};
			});
		},

		createEventRating: async (
			_: any, 
			{ 
				userId, 
				eventId, 
				scoreRating, 
				review 
			}: { 
				userId: number; 
				eventId: number; 
				scoreRating: number; 
				review: string 
			}
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				const numericUserId = this.validateId(userId);
				const numericEventId = this.validateId(eventId);

				if (scoreRating < 1 || scoreRating > 5) {
					throw new Error('Score rating must be between 1 and 5');
				}

				const eventRating = await services.ratingsService.createRating(
					numericUserId,
					numericEventId,
					scoreRating,
					review
				);

				return {
					singleRating: eventRating,
					message: "Event rated successfully"
				};
			});
		},

		createEventNotification: async (
			_: any, 
			{ 
				userId, 
				eventId, 
				content, 
				status, 
				notificationType 
			}: { 
				userId: number; 
				eventId: number; 
				content: string; 
				status: string; 
				notificationType: string 
			}
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				const numericUserId = this.validateId(userId);
				const numericEventId = this.validateId(eventId);

				this.validateRequiredFields(
					{ content, status, notificationType },
					['content', 'status', 'notificationType']
				);

				const sanitizedContent = this.sanitizeInput({ content }).content;

				const eventNotification = await services.notificationService.createNotification(
					numericUserId,
					numericEventId,
					sanitizedContent,
					status,
					notificationType
				);

				return {
					singleNotification: eventNotification,
					message: "Event notification created successfully"
				};
			});
		},

		createCategory: async (
			_: any,
			{ input }: { input: { name: string; description?: string } }
		): Promise<CategoryResponse> => {
			return this.executeResolver<CategoryResponse>(async () => {
				this.validateRequiredFields(input, ['name']);
				const sanitizedInput = this.sanitizeInput(input);
				const category = await services.categoryService.createCategory(
					sanitizedInput.name,
					sanitizedInput.description
				);
				return {
					category,
					message: "Category created successfully"
				};
			});
		},

		addCategoriesToEvent: async (
			_: any,
			{ eventId, categoryIds }: { eventId: number; categoryIds: number[] }
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				const numericEventId = this.validateId(eventId);
				
				await services.eventService.getEventById(numericEventId);
				
				const categories = await services.categoryService.addEventToCategories(
					numericEventId, 
					categoryIds
				);
				return {
					categories,
					message: "Categories added to event successfully"
				};
			});
		},

		removeEventCategories: async (
			_: any,
			{ eventId, categoryIds }: { eventId: number; categoryIds: number[] }
		): Promise<MutationResponse> => {
			return this.executeResolver<MutationResponse>(async () => {
				const numericEventId = this.validateId(eventId);
				
				await services.eventService.getEventById(numericEventId);
				
				await services.categoryService.removeEventFromCategories(
					numericEventId, 
					categoryIds
				);
				return {
						message: "Categories removed from event successfully"
				};
			});
		},
	};
}

export const createEventResolvers = {
	Mutation: CreateEventResolver.Mutation
};
