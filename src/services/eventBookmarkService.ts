import { Repository } from "typeorm";
import { EventBookmarks } from "../entities/Event.js";
import { BaseService } from "./baseService.js";
import { GraphQLError } from "graphql";

export class EventBookmarkService extends BaseService<EventBookmarks> {
  constructor(repository: Repository<EventBookmarks>) {
    super(repository);
  }

  async createEventBookmark(userId: number, eventId: number): Promise<EventBookmarks> {
    return this.executeOperation(async () => {
      const existingBookmark = await this.repository.findOne({
        where: {
          user: { id: userId },
          event: { id: eventId }
        }
      });

      if (existingBookmark) {
        throw new GraphQLError("Event already bookmarked", {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const bookmark = this.repository.create({
        user: { id: userId },
        event: { id: eventId }
      });

      return this.repository.save(bookmark);
    });
  }

  async getBookmarks(): Promise<EventBookmarks[]> {
    return this.repository.find();
  }

  async getBookmark(eventId: number, userId: number, id: number): Promise<EventBookmarks | null> {
    return this.repository.findOne({
      where: { 
        id,
        event: { id: eventId },
        user: { id: userId }
      }
    });
  }

  async deleteBookmark(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}