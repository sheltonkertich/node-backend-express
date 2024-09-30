import { Repository } from "typeorm";
import { EventLikes } from "../entities/Event";

export class EventLikeService {
  private eventLikesRepository: Repository<EventLikes>;

  constructor(eventLikesRepository: Repository<EventLikes>) {
    this.eventLikesRepository = eventLikesRepository;
  }
  async getAllLikes(): Promise<EventLikes[]> {
    return await this.eventLikesRepository.find();
  }
  async createLike(userId: string, eventId: number){
    const newLike = this.eventLikesRepository.create({ userId, event: { id: eventId } });
    return await this.eventLikesRepository.save(newLike);
  }

  async deleteLike(id: number){
    const like = await this.eventLikesRepository.findOneBy({ id });
    if (!like) return null;
    await this.eventLikesRepository.softDelete({ id });
    return like;
  }
}