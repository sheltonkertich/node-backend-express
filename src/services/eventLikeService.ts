import { Repository } from "typeorm";
import { EventLikes, Event } from "../entities/Event.js";
import { BaseService } from "./baseService.js";

export class EventLikeService extends BaseService<EventLikes> {
  constructor(eventLikesRepository: Repository<EventLikes>) {
    super(eventLikesRepository);
  }

  async getAllLikes(): Promise<EventLikes[]> {
    return this.executeOperation(() => 
      this.repository.find({
        relations: {
          event: true,
          user: true
        },
      })
    );
  }

  async getEventLike(eventID: number, userID: number, id: number): Promise<EventLikes | null> {
    return this.executeOperation(async () => {
      const eventLike = await this.repository.findOne({
        where: {
          id,
          event: { id: eventID },
          user: { id: userID },
        },
        relations: {
          event: true,
          user: true
        },
      });

      return eventLike;
    });
  }

  async createLike(userId: number, eventId: number): Promise<EventLikes> {
    return this.executeOperation(async () => {
      // Check if event exists
      const event = await this.repository.manager.findOne(Event, { 
        where: { id: eventId } 
      });

      if (!event) {
        this.throwNotFoundError("Event", eventId);
      }

      // Check if like already exists
      const existingLike = await this.repository.findOne({
        where: {
          event: { id: eventId },
          user: { id: userId },
        }
      });

      if (existingLike) {
        this.throwValidationError("User has already liked this event");
      }

      const newLike = this.repository.create({
        event: { id: eventId },
        user: { id: userId },
      });

      return await this.repository.save(newLike);
    });
  }

  async deleteLike(id: number): Promise<void> {
    return this.executeOperation(async () => {
      const result = await this.repository.delete({ id });
      
      if (result.affected === 0) {
        this.throwNotFoundError("EventLike", id);
      }
    });
  }
}