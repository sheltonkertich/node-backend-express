import services from '../services';
import { Request, Response } from 'express';

export class EventInteractionController {
    async likeEvent(req: Request, res: Response) {
        try {
            const { eventId } = req.params;
            const userId = req.user!.$id;

            const hasLiked = await services.eventLike.hasUserLikedEvent(userId, eventId);
            if (hasLiked) {
                await services.eventLike.deleteLike(userId, eventId);
                return res.json({
                    success: true,
                    message: 'Event unliked successfully'
                });
            }

            const like = await services.eventLike.createLike(userId, eventId);
            return res.json({
                success: true,
                message: 'Event liked successfully',
                like
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Failed to process like'
            });
        }
    }

    async bookmarkEvent(req: Request, res: Response) {
        try {
            const { eventId } = req.params;
            const userId = req.user!.$id;

            const hasBookmarked = await services.eventBookmark.hasUserBookmarkedEvent(userId, eventId);
            if (hasBookmarked) {
                await services.eventBookmark.deleteBookmark(userId, eventId);
                return res.json({
                    success: true,
                    message: 'Bookmark removed successfully'
                });
            }

            const bookmark = await services.eventBookmark.createBookmark(userId, eventId);
            return res.json({
                success: true,
                message: 'Event bookmarked successfully',
                bookmark
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Failed to process bookmark'
            });
        }
    }
} 