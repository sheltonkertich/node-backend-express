import { Repository } from "typeorm";
import { Event } from "../entities/Event";
import { GraphQLError } from "graphql";
import { handleError } from "../utils/handleError.js";

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
          slots: true,

          ratings: true,
          notifications: true
        }
      });
    }  catch (error) {
      throw handleError(error);
    }
  }

  async getEventById(id: number): Promise<Event | null> {
    try {
      return await this.eventRepository.findOne({
        where: { id }, relations: {
          eventLikes: true,
          bookmarks: true,
          ratings: true,
          notifications: true,
          slots:true
        }
      });
    }  catch (error) {
      throw handleError(error);
    }
  }

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    try {
      // First, create and save the event to get an ID
      const event = this.eventRepository.create(eventData);
      await this.eventRepository.save(event);
      return event;

    }  catch (error) {
      throw handleError(error);
    }
  }

  async updateEvent(eventId: number,eventUpdates: Partial<Event> = {}): Promise<Event | null> {
    try {

      if (!Object.keys(eventUpdates).length) {
        throw new GraphQLError("No valid fields provided for event update.",{extensions:{code:"BAD_USER_INPUT"}});
      }
      const event = await this.eventRepository.findOne({ where: { id: eventId } });
      if (!event) {
        throw new GraphQLError(`Event with id ${eventId} not found.`);
      }
      const result = await this.eventRepository.update(eventId, eventUpdates);

      if (result.affected === 0) {
        throw new GraphQLError(`update failed on event with id ${eventId}`);
      }
      return await this.eventRepository.findOne({ where: { id: eventId } });
    }  catch (error) {
      throw handleError(error);
    }
  }

  async deleteEvent(id: number): Promise<Event | null> {
    try {
      const event = await this.eventRepository.findOne({ where: { id } });
      if (!event) {
        throw new GraphQLError(`Event with id ${id} not found.`);
      }
      await this.eventRepository.softDelete({ id });
      return event; // Consider returning a confirmation message instead
    } catch (error) {
      throw handleError(error);
    }
  }
}
