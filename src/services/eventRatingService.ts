import { Repository } from "typeorm";
import { EventRatings } from "../entities/Event";
import { services } from "./index.js";
import { GraphQLError } from "graphql";
import { handleError } from "../utils/handleError.js";

export class EventRatingService {
  private eventRatingsRepository: Repository<EventRatings>;

  constructor(eventRatingsRepository: Repository<EventRatings>) {
    this.eventRatingsRepository = eventRatingsRepository;
  }

  async getAllRatings(): Promise<EventRatings[]> {
    return await this.eventRatingsRepository.find();
  }
  async createRating(userId: number, eventId: number, scoreRating: number, review: string): Promise<EventRatings> {
    try {
      const user = await services.userService.getUserById(userId)
      const event = await services.eventService.getEventById(eventId)

      if (!user) {
          throw new GraphQLError("User not found");
      } if (!event) {
          throw new GraphQLError(" event not found");
      }
      if (scoreRating < 1 || scoreRating > 5) {
        throw new GraphQLError("Invalid score rating. It should be between 1 and 5.");
      }
      // Create a single rating object
      const newRating = this.eventRatingsRepository.create({
        event: { id: eventId },
        user: { id: userId },
        scoreRating:scoreRating,
        review:review
      });

      return await this.eventRatingsRepository.save(newRating);
    }catch (error) {
      throw handleError(error);
    }
  }

  async deleteRating(id: number){
    const rating = await this.eventRatingsRepository.findOneBy({ id });
    if (!rating) return null;
    await this.eventRatingsRepository.softDelete({ id });
    return rating;
  }
}