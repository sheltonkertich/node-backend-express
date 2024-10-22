import { services } from "../services/index.js";
import { EventResponse, EventInputType, EventLikesType, MutationResponse, EventUpdatesType } from "../types/eventTypes.js";

export const eventResolvers = {
	Query: {
		getEvents: async (): Promise<EventResponse | null> => {

			try {
				const EventsResult = await services.eventService.getAllEvents()
				if (!EventsResult) {
					return {
						success: false,
						message: "no events found",
						events: null
					}
				}
				return {
					success: true,
					message: " events found",
					events: EventsResult,
				};

			} catch (error) {
				console.error("Error in getEvents resolver:", error);
				throw new Error("Could not retrieve events. Please try again later.");
			}
		},
		getEvent: async (_: any, { id }: { id: number }): Promise<EventResponse> => {
			try {
				const EventsResult = await services.eventService.getEventById(id);
				if (EventsResult) {
					return {
						success: true,
						message: "event fetch successfully.",
						event: EventsResult,
					}
				}
				return {
					success: true,
					message: `No event for event id ${id} in the DB`,
					event: null
				};
			} catch (error) {
				console.error(`Error in getEvent resolver for id ${id}:`, error);
				throw new Error("Could not retrieve the event. Please check the user ID and try again.");
			}
		},
		getAllLikes: async (): Promise<EventResponse | null> => {

			try {
				const EventLikesResult = await services.likesService.getAllLikes()
				if (!EventLikesResult) {
					return {
						success: false,
						message: "no event likes found",
						eventLikes: null
					}
				}
				return {
					success: true,
					message: " events likes found",
					eventLikes: EventLikesResult,
				};

			} catch (error) {
				console.error("Error in getEvents resolver:", error);
				throw new Error("Could not retrieve events. Please try again later.");
			}
		},
		getEventLike: async (_: any, { eventID, userID, id }: { eventID: number, userID: number, id: number }): Promise<EventResponse | null> => {
			try {
				const eventLike = await services.likesService.getEventLike(eventID, userID, id);
				console.log(eventLike)
				if (eventLike) {
					return {
						success: true,
						message: "eventLike fetch successfully.",
						eventLike: eventLike
					};
				}
				return {
					success: false,
					message: "no like found",
					eventLike: null
				};
			} catch (error: any) {
				console.error('Error fetching event like:', error);
				const errorMessage = error.detail || 'default erreo An unexpected error occurred.';
				const errorCode = error.code || 'UNKNOWN_ERROR';
				return {
					success: false,
					message: errorMessage,
					event: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				}; // or handle it according to your needs
			}
		},
		getAllEventBookmarks: async (): Promise<EventResponse | null> => {

			try {
				const EventBookmarks = await services.bookmarkService.getAllEventBookmarks()
				if (!EventBookmarks) {
					return {
						success: false,
						message: "no Bookmarks found",
						eventLikes: null
					}
				}
				return {
					success: true,
					message: " events bookmarks found",
					eventBookmarks: EventBookmarks,
				};

			} catch (error) {
				console.error("Error in getAllBookmarks resolver:", error);
				throw new Error("Could not retrieve bookmarks. Please try again later.");
			}
		},
		getEventBookmark: async (_: any, { eventID, userID, id }: { eventID: number, userID: number, id: number }): Promise<EventResponse | null> => {
			try {
				const eventBookmark = await services.bookmarkService.getEventBookmark(eventID, userID, id);
				console.log(eventBookmark)
				if (eventBookmark) {
					return {
						success: true,
						message: "eventBookmark fetch successfully.",
						eventBookmark: eventBookmark
					};
				}
				return {
					success: false,
					message: "no bookmark found",
					eventBookmark: null
				};
			} catch (error: any) {
				console.error('Error fetching event bookmark:', error);
				const errorMessage = error.detail || 'default erreo An unexpected error occurred.';
				const errorCode = error.code || 'UNKNOWN_ERROR';
				return {
					success: false,
					message: errorMessage,
					event: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				}; // or handle it according to your needs
			}
		},


		// getBookmarks: async () => await services.bookmarkService.getAllBookmarks(),
		// getEventBookings: async () => await services.bookingsService.getAllBookings(),
		// getEventCategories: async () => await services.categoriesService.getAllCategories(),
		// getEventRatings: async () => await services.ratingsService.getAllRatings(),
		// getEventNotifications: async () => await services.notificationService.getAllNotifications(),
	},
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


		deleteEvent: async (_: any, { id }: { id: number }): Promise<MutationResponse> => {
			try {
				const deletedEvent = await services.eventService.deleteEvent(id);
				return {
					success: true,
					message: "Event deleted successfully.",
					singleEvent: deletedEvent,

				}; // Return a confirmation message or the deleted event
			} catch (error) {
				console.error("Error deleting event:", error);
				return {
					success: false,
					message: `Event with id ${id} not found. Delete failed.`,
					singleEvent: null,
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
		deleteLike: async (_: any, { id }: { id: number }): Promise<MutationResponse> => {
			try {
				await services.likesService.deleteLike(id)
				return {
					success: true,
					message: "Event Like deleted successfully.",
					singleEventLike: null,

				}; // Return a confirmation message or the deleted event
			} catch (error) {
				console.error("Error deleting event like:", error);
				return {
					success: false,
					message: `like with id ${id} not found. Delete failed.`,
					singleEventLike: null,
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
				const errorMessage = error.detail || 'default erreo An unexpected error occurred.';
				return {
					success: false,
					message: errorMessage,
					singleEventBookmark: null,
					errorCode: errorCode,
					errorDetail: error, // Optionally include the full error object for more details
				};
			}
		},
		deleteEventBookmark: async (_: any, { id }: { id: number }): Promise<MutationResponse> => {
			try {
				await services.bookmarkService.deleteEventBookmark(id)
				return {
					success: true,
					message: "Event Bookmark deleted successfully.",
					singleEventBookmark: null,

				}; // Return a confirmation message or the deleted event
			} catch (error) {
				console.error("Error deleting event bookmark:", error);
				return {
					success: false,
					message: `bookmark with id ${id} not found. Delete failed.`,
					singleEventBookmark: null,
				};

			}
		},
	},
};
