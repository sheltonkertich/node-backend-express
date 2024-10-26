import { Repository } from "typeorm";
import { EventLikes } from "../entities/Event.js";
import { Event } from "../entities/Event.js";

export class EventLikeService {
  private eventLikesRepository: Repository<EventLikes>;

  constructor(eventLikesRepository: Repository<EventLikes>) {
    this.eventLikesRepository = eventLikesRepository;
  }
  async getAllLikes(): Promise<EventLikes[]> {
    try {
      return await this.eventLikesRepository.find({
        relations: {
          event: true,
          user: true
        },
      });
    } catch (error) {
      console.error("Error fetching all likes:", error);
      throw new Error("Failed to retrieve likes.");
    }
  }
  async getEventLike(eventID: number, userID: number, id: number): Promise<EventLikes | null> {
    try {
      console.log(`Fetching like for eventId: ${eventID}, userId: ${userID}, id: ${id}`);
      
      // Fetch the eventLike record directly with relationships
      const eventLike = await this.eventLikesRepository.findOne({
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
  
      if (!eventLike) {
        console.log(`No like found for eventId: ${eventID}, userId: ${userID}, id: ${id}`);
        return null; // Explicit null return if not found
      }
  
      console.log('Like found:', eventLike);
      return eventLike;
    } catch (error) {
      console.error('Error fetching like:', error);
      throw error;
    }
  }
  

  async createLike(user: number, event: number): Promise<EventLikes> {
    try {
      const like = await this.eventLikesRepository.manager.findOne(Event, { where: { id: event } });
      if (!like) {
        throw new Error(`Event with id ${event} not found.`);
      }

      console.log('User liking the event with id:', event);

      // Create a single like object
      const newLike = this.eventLikesRepository.create({
        event: { id: event },
        user: { id: user },
      });

      return await this.eventLikesRepository.save(newLike);
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