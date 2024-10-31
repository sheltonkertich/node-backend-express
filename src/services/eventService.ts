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
        relations: {
          eventLikes: true,
          bookmarks: true,
          // bookings: true,

          // ratings: true,
          // notifications: true
        }
      });
    } catch (error) {
      console.error("Error fetching all events:", error);
      throw new Error("Failed to retrieve events.");
    }
  }

  async getEventById(id: number): Promise<Event | null> {
    try {
      return await this.eventRepository.findOne({
        where: { id }, relations: {
          eventLikes: true,
          bookmarks: true,
          ratings: true,
          notifications: true
        }
      });
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      throw new Error("Failed to retrieve event.");
    }
  }

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    try {
      // First, create and save the event to get an ID
      const event = this.eventRepository.create(eventData);
      await this.eventRepository.save(event);
      return event;

    } catch (error: any) {
      const errorCode = error.code || 'UNKNOWN_ERROR';
      const errorMessage = error.detail || 'An unexpected error occurred.';
      console.error(`Service Error creating event: ${errorMessage}`, error);
      throw new Error(`Failed to create event. Error Code: ${errorCode}. Message: ${errorMessage}`);
    }
  }

  async updateEvent(eventId: number,eventUpdates: Partial<Event> = {}): Promise<Event | null> {
    try {

      if (!Object.keys(eventUpdates).length) {
        throw new Error("No valid fields provided for event update.");
      }
      const event = await this.eventRepository.findOne({ where: { id: eventId } });
      if (!event) {
        throw new Error(`Event with id ${eventId} not found.`);
      }
      const result = await this.eventRepository.update(eventId, eventUpdates);

      if (result.affected === 0) {
        throw new Error(`update failed on event with id ${eventId}`);
      }
      return await this.eventRepository.findOne({ where: { id: eventId } });
    } catch (error: any) {
      const errorCode = error.code || 'UNKNOWN_ERROR';
      const errorMessage = error.detail || error.message || 'An unexpected error occurred.';
      console.error(`Service Error updating event: ${errorMessage}`, error);
      throw new Error(`Failed to update event. Error Code: ${errorCode}. Message: ${errorMessage}`);
    }
  }

  async deleteEvent(id: number): Promise<Event | null> {
    try {
      const event = await this.eventRepository.findOne({ where: { id } });
      if (!event) {
        throw new Error(`Event with id ${id} not found.`);
      }
      await this.eventRepository.softDelete({ id });
      return event; // Consider returning a confirmation message instead
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
      throw new Error("Failed to delete event.");
    }
  }
}
