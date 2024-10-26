import { services } from "../services/index.js";
import { EventResponse} from "../types/eventTypes.js";

export const queryEventResolvers = {
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
                    success: false,
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

}

