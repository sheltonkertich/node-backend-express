import { Repository } from "typeorm";
import { EventBookmarks } from "../entities/Event.js";
import { Event } from "../entities/Event.js";
import { GraphQLError } from "graphql";
import { handleError } from "../utils/handleError.js";

export class EventBookmarkService {
  private eventBookmarksRepository: Repository<EventBookmarks>;

  constructor(eventBookmarksRepository: Repository<EventBookmarks>) {
    this.eventBookmarksRepository = eventBookmarksRepository;
  }

  async getAllEventBookmarks(): Promise<EventBookmarks[]> {
    try {
      return await this.eventBookmarksRepository.find({
        relations: {
          event: true,
          user: true
        },
      });
    } catch (error) {
      throw handleError(error);
    }
  }

  async getEventBookmark(eventID: number, userID: number, id: number): Promise<EventBookmarks | null> {
    try {
      console.log(`Fetching bookmark for eventId: ${eventID}, userId: ${userID}, id: ${id}`);

      // Fetch the eventLike record directly with relationships
      const eventBookmark = await this.eventBookmarksRepository.findOne({
        where: {
          id,
          event: { id: eventID },
          user: { id: userID },
        },
        relations: {
          event: true,
          user: true
        }, // Ensure relations are loaded
      });

      if (!eventBookmark) {
        console.log(`No bookmark found for eventId: ${eventID}, userId: ${userID}, id: ${id}`);
        return null; // Explicit null return if not found
      }

      console.log('bookmark found:', eventBookmark);
      return eventBookmark;
    } catch (error) {
      throw handleError(error);
    }
  }

  async createEventBookmark(user: number, event: number): Promise<EventBookmarks> {
    try {
      const bookmark = await this.eventBookmarksRepository.manager.findOne(Event, { where: { id: event } })
      if (!bookmark) {
        throw new GraphQLError(`Event with id ${event} not found.`, { extensions: { code: 'EVENT_NOT_FOUND' }, });

      }

      console.log('Booki marking with id:', event);

      // Create a single like object
      const newBookmark = this.eventBookmarksRepository.create({
        event: { id: event },
        user: { id: user },
      });

      return await this.eventBookmarksRepository.save(newBookmark);
    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteEventBookmark(id: number): Promise<void> {
    const result = await this.eventBookmarksRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new GraphQLError(`bookmark with id ${id} not found.`);
    }
  }
}