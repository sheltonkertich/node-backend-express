import { Repository } from "typeorm";
import { Event } from "../entities/Event";

export class EventService {
  private eventRepository: Repository<Event>;

  constructor(eventRepository: Repository<Event>) {
    this.eventRepository = eventRepository;
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find({
      relations: ["likes", "bookings", "bookmarks", "ratings", "notifications"],
    });
  }

  async getEventById(id: number): Promise<Event | null> {
    return await this.eventRepository.findOneBy({ id });
  }

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    return await this.eventRepository.save(event);
  }

  async updateEvent(
    id: number,
    eventData: Partial<Event>
  ): Promise<Event | null> {
    const event = this.eventRepository.update(id, eventData);
    return await this.eventRepository.findOneBy({ id });
  }

  async deleteEvent(id: number): Promise<Event | null> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) return null;
    await this.eventRepository.softDelete({ id });
    return event;
  }
}
