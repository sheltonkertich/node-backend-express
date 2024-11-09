import { services } from "../services/index.js";
import { MutationResponse } from "../types/eventTypes.js";
import { handleGraphQLError } from "../utils/handleError.js";

export const deleteEventResolver = {
    Mutation: {

        deleteEvent: async (_: any, { id }: { id: number }): Promise<MutationResponse> => {
            try {
                const deletedEvent = await services.eventService.deleteEvent(id);
                return {
                    success: true,
                    message: "Event deleted successfully.",
                    singleEvent: deletedEvent,

                }; // Return a confirmation message or the deleted event
            }catch (error: any) {
                return handleGraphQLError(error, { singleEvent: null });
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
            } catch (error: any) {
                return handleGraphQLError(error, { singleEventLike: null });
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
            } catch (error: any) {
                return handleGraphQLError(error, { singleEventBookmark: null });
			}
        },
    }
}