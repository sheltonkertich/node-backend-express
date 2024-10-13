import { Repository } from "typeorm";
import { Event } from "../entities/Event";
import { EventUpdates } from "../types/eventTypes";

export class EventService {
  private eventRepository: Repository<Event>;

  constructor(eventRepository: Repository<Event>) {
    this.eventRepository = eventRepository;
  }

  async getAllEvents(): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        relations: ["likes", "bookings", "bookmarks", "ratings", "notifications"],
      });
    } catch (error) {
      console.error("Error fetching all events:", error);
      throw new Error("Failed to retrieve events.");
    }
  }

  async getEventById(id: number): Promise<Event | null> {
    try {
      return await this.eventRepository.findOneBy({ id });
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      throw new Error("Failed to retrieve event.");
    }
  }

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    try {
      const event = this.eventRepository.create(eventData);
      return await this.eventRepository.save(event);
    } catch (error: any) {
      const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
      const errorMessage = error.detail || 'An unexpected error occurred.';
      console.error(`Service Error creating event: ${errorMessage}`, error);
      throw new Error(`Failed to create event. Error Code: ${errorCode}. Message: ${errorMessage}`);
    }
  }
  async updateEvent(id: number, {...eventUpdates}: Partial<EventUpdates> = {}): Promise<Event | null> {
    try {
        // Check if eventData is defined and is an object
        console.log('id:',id, 'eventData:', eventUpdates);
        if (!eventUpdates || typeof eventUpdates !== 'object' || !Object.keys(eventUpdates).length) {
            throw new Error("No valid fields provided for update.");
        }

        const result = await this.eventRepository.update(id, eventUpdates);
        if (result.affected === 0) {
            throw new Error(`Event with id ${id} not found.`);
        }

        return await this.eventRepository.findOneBy({ id });
    } catch (error: any) {
        const errorCode = error.code || 'UNKNOWN_ERROR'; // Default code if none provided
        const errorMessage = error.detail || error.message || 'An unexpected error occurred.';
        console.error(`Service Error updating event: ${errorMessage}`, error);
        throw new Error(`Failed to update event. Error Code: ${errorCode}. Message: ${errorMessage}`);
    }
}



  async deleteEvent(id: number): Promise<Event | null> {
    try {
      const event = await this.eventRepository.findOneBy({ id });
      if (!event) return null;

      await this.eventRepository.softDelete({ id });
      return event; // Returning the deleted event
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
      throw new Error("Failed to delete event.");
    }
  }
}
