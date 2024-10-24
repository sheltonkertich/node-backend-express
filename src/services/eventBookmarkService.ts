import { Repository } from "typeorm";
import { EventBookmarks } from "../entities/Event.js";
import { Event } from "../entities/Event.js";

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
      console.error("Error fetching all bookmarks:", error);
      throw new Error("Failed to retrieve bookmarks.");
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
      console.error('Error fetching bookmark:', error);
      throw error;
    }
  }

  async createEventBookmark(user: number, event: number): Promise<EventBookmarks> {
    try {
      const bookmark = await this.eventBookmarksRepository.manager.findOne(Event,{where: {id:event}})
      if (!bookmark) {
        throw new Error(`Event with id ${event} not found.`);
      }

      console.log('Booki marking with id:', event);

      // Create a single like object
      const newBookmark = this.eventBookmarksRepository.create({
        event: { id: event },
        user: { id: user },
      });

      return await this.eventBookmarksRepository.save(newBookmark);
    } catch (error) {
      console.error('Error creating bookmark:', error);
      throw error; // or handle the error as needed
    }
  }

  async deleteEventBookmark(id: number): Promise<void> {
    const result = await this.eventBookmarksRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new Error(`bookmark with id ${id} not found.`);
    }
  }
}