import { Repository } from "typeorm";
import { EventRatings } from "../entities/Event";

export class EventRatingService {
  private eventRatingsRepository: Repository<EventRatings>;

  constructor(eventRatingsRepository: Repository<EventRatings>) {
    this.eventRatingsRepository = eventRatingsRepository;
  }


  async createRating(userId: string, eventId: number, scoreRating: number){
    const newRating = this.eventRatingsRepository.create({ userId, event: { id: eventId }, scoreRating });
    return await this.eventRatingsRepository.save(newRating);
  }

  async deleteRating(id: number){
    const rating = await this.eventRatingsRepository.findOneBy({ id });
    if (!rating) return null;
    await this.eventRatingsRepository.softDelete({ id });
    return rating;
  }
}