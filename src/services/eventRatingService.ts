import { Repository } from "typeorm";
import { EventRatings } from "../entities/Event.js";
import { services } from "./index.js";
import { BaseService } from "./baseService.js";

export class EventRatingService extends BaseService<EventRatings> {
  constructor(eventRatingsRepository: Repository<EventRatings>) {
    super(eventRatingsRepository);
  }

  private validateRating(scoreRating: number): void {
    if (scoreRating < 1 || scoreRating > 5) {
      this.throwValidationError("Invalid score rating. It should be between 1 and 5.");
    }
  }

  async getAllRatings(): Promise<EventRatings[]> {
    return this.executeOperation(() => 
      this.repository.find({
        relations: {
          event: true,
          user: true
        }
      })
    );
  }

  async createRating(
    userId: number, 
    eventId: number, 
    scoreRating: number, 
    review: string
  ): Promise<EventRatings> {
    return this.executeOperation(async () => {
      // Validate inputs
      this.validateRating(scoreRating);

      // Check if user and event exist
      await Promise.all([
        services.userService.getUserById(userId),
        services.eventService.getEventById(eventId)
      ]);

      // Check if user has already rated this event
      const existingRating = await this.repository.findOne({
        where: {
          event: { id: eventId },
          user: { id: userId }
        }
      });

      if (existingRating) {
        this.throwValidationError("User has already rated this event");
      }

      // Create and save the rating
      const newRating = this.repository.create({
        event: { id: eventId },
        user: { id: userId },
        scoreRating,
        review
      });

      return await this.repository.save(newRating);
    });
  }

  async deleteRating(id: number): Promise<void> {
    return this.executeOperation(async () => {
      const result = await this.repository.softDelete({ id });
      
      if (result.affected === 0) {
        this.throwNotFoundError("EventRating", id);
      }
    });
  }

  async updateRating(
    id: number, 
    scoreRating: number, 
    review: string
  ): Promise<EventRatings> {
    return this.executeOperation(async () => {
      this.validateRating(scoreRating);

      const result = await this.repository.update(id, { scoreRating, review });

      if (result.affected === 0) {
        this.throwNotFoundError("EventRating", id);
      }

      return await this.findOneByIdOrThrow(id, ['event', 'user']);
    });
  }

  async getRatingsByEvent(eventId: number): Promise<EventRatings[]> {
    return this.executeOperation(() =>
      this.repository.find({
        where: { event: { id: eventId } },
        relations: {
          user: true
        }
      })
    );
  }

  async getRatingsByUser(userId: number): Promise<EventRatings[]> {
    return this.executeOperation(() =>
      this.repository.find({
        where: { user: { id: userId } },
        relations: {
          event: true
        }
      })
    );
  }
}