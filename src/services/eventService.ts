import { Repository } from "typeorm";
import { Event } from "../entities/Event";

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
    } catch (error) {
      console.error("Error creating event:", error);
      throw new Error("Failed to create event.");
    }
  }

  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event | null> {
    try {
      const result = await this.eventRepository.update(id, eventData);
      if (result.affected === 0) {
        return null; // No event was found to update
      }
      return await this.eventRepository.findOneBy({ id });
    } catch (error) {
      console.error(`Error updating event with id ${id}:`, error);
      throw new Error("Failed to update event.");
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
