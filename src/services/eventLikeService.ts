import { Repository } from "typeorm";
import { EventLikes } from "../entities/Event.js";
import { Event } from "../entities/Event.js";

export class EventLikeService {
  private eventLikesRepository: Repository<EventLikes>;

  constructor(eventLikesRepository: Repository<EventLikes>) {
    this.eventLikesRepository = eventLikesRepository;
  }
  async getAllLikes(): Promise<EventLikes[]> {
    return await this.eventLikesRepository.find();
  }
  async getEventLike(eventId: number): Promise<EventLikes[]> {
    return await this.eventLikesRepository.find({ where: { event: { id: eventId } } });
  }
  async createLike(userId: string, eventId: number):Promise<EventLikes> {
    const event = await this.eventLikesRepository.manager.findOne(Event, { where: { id: eventId } });
    if (!event) {
      throw new Error(`Event with id ${eventId} not found.`);
    }

    const like = this.eventLikesRepository.create({ event });
    return await this.eventLikesRepository.save(like);
  }

  async deleteLike(id: number):Promise<void> {
    const result = await this.eventLikesRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new Error(`Like with id ${id} not found.`);
  }

}
}