import { Repository } from "typeorm";
import { EventLikes } from "../entities/Event.js";
import { Event } from "../entities/Event.js";
import { User } from "../entities/User.js";

export class EventLikeService {
  private eventLikesRepository: Repository<EventLikes>;

  constructor(eventLikesRepository: Repository<EventLikes>) {
    this.eventLikesRepository = eventLikesRepository;
  }
  async getAllLikes(): Promise<EventLikes[]> {
    return await this.eventLikesRepository.find();
  }
  async getEventLike(eventId: number, userId: number, id: number): Promise<EventLikes | null> {
    try {
      console.log(`Fetching like for eventId: ${eventId}, userId: ${userId}, id: ${id}`);
      
      // Fetch the eventLike record directly with relationships
      const eventLike = await this.eventLikesRepository.findOne({
        where: {
          id,
          eventId: { id: eventId },
          userId: { id: userId },
        },
        relations: ['eventId', 'userId'], // Ensure relations are loaded
      });
  
      if (!eventLike) {
        console.log(`No like found for eventId: ${eventId}, userId: ${userId}, id: ${id}`);
        return null; // Explicit null return if not found
      }
  
      console.log('Like found:', eventLike);
      return eventLike;
    } catch (error) {
      console.error('Error fetching like:', error);
      throw error;
    }
  }
  

  async createLike(userId: number, eventId: number): Promise<EventLikes> {
    try {
      const event = await this.eventLikesRepository.manager.findOne(Event, { where: { id: eventId } });
      if (!event) {
        throw new Error(`Event with id ${eventId} not found.`);
      }

      console.log('User liking the event with id:', eventId);

      // Create a single like object
      const like = this.eventLikesRepository.create({
        eventId: { id: eventId },
        userId: { id: userId },
      });

      return await this.eventLikesRepository.save(like);
    } catch (error) {
      console.error('Error creating like:', error);
      throw error; // or handle the error as needed
    }
  }


  async deleteLike(id: number): Promise<void> {
    const result = await this.eventLikesRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new Error(`Like with id ${id} not found.`);
    }

  }
}