import { services } from "../services/index.js";
import { EventResponse} from "../types/eventTypes.js";
import { handleGraphQLError } from "../utils/handleError.js";

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
    
            } catch (error: any) {
                return handleGraphQLError(error);
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
            } catch (error: any) {
                return handleGraphQLError(error);
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
    
            } catch (error: any) {
                return handleGraphQLError(error);
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
                return handleGraphQLError(error, { event: null });
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
    
            } catch (error: any) {
				 return handleGraphQLError(error);
			}
        },
        getEventBookmark: async (_: any, { eventID, userID, id }: { eventID: number, userID: number, id: number }): Promise<EventResponse | null> => {
            try {
                const eventBookmark = await services.bookmarkService.getEventBookmark(eventID, userID, id);
               // console.log(eventBookmark)
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
                return handleGraphQLError(error);
			}
        },
        getAllslots: async (): Promise<EventResponse | null> => {
    
            try {
                const AllSlots = await services.slotsService.getEventSlots()
                if (!AllSlots) {
                    return {
                        success: false,
                        message: "no eventSlots found",
                        eventLikes: null
                    }
                }
                return {
                    success: true,
                    message: " events slots found",
                    allSlots: AllSlots,
                };
    
            } catch (error: any) {
                return handleGraphQLError(error);
			}
        },
        getEventSlot: async (_: any, { id, codeName}: { id: number, codeName: string }): Promise<EventResponse | null> => {
            try {
                const eventSlot = await services.slotsService.getEventSlot(id, codeName);
                //console.log(eventBookmark)
                if (eventSlot) {
                    return {
                        success: true,
                        message: "eventSlot fetch successfully.",
                        eventSlot: eventSlot
                    };
                }
                return {
                    success: false,
                    message: `no slot found, for codename ${codeName} or id ${id}. check your input`,
                    eventBookmark: null
                };
            } catch (error: any) {
                return handleGraphQLError(error);
			}
        },
    
        // getBookmarks: async () => await services.bookmarkService.getAllBookmarks(),
        // getEventBookings: async () => await services.bookingsService.getAllBookings(),
        // getEventCategories: async () => await services.categoriesService.getAllCategories(),
        // getEventRatings: async () => await services.ratingsService.getAllRatings(),
        // getEventNotifications: async () => await services.notificationService.getAllNotifications(),
    },

}

