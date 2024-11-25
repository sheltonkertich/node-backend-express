import { Repository } from "typeorm";
import { Event } from "../entities/Event.js";
import { BaseService } from "./baseService.js";
import { EventInputType, EventUpdateInput, EventStatus } from "../types/eventTypes.js";
import { GraphQLError } from "graphql";

export class EventService extends BaseService<Event> {
  constructor(eventRepository: Repository<Event>) {
    super(eventRepository);
  }

  async createEvent(input: EventInputType): Promise<Event> {
    return this.executeOperation(async () => {
      this.validateEventStatus(input.status);

      const event = this.repository.create({
        ...input,
        categories: input.categories || []
      });

      return this.repository.save(event);
    });
  }

  async updateEvent(id: number, updates: EventUpdateInput): Promise<Event> {
    return this.executeOperation(async () => {
      const event = await this.findOneByIdOrThrow(id);

      if (updates.status) {
        this.validateEventStatus(updates.status);
      }

      Object.assign(event, updates);
      return this.repository.save(event);
    });
  }

  async getAllEvents(): Promise<Event[]> {
    return this.executeOperation(() => 
      this.repository.find({
        relations: {
          eventLikes: true,
          bookmarks: true,
          slots: true,
          ratings: true,
          notifications: true,
          categories: true
        }
      })
    );
  }

  async getEventById(id: number): Promise<Event> {
    return this.executeOperation(async () => {
      const event = await this.repository.findOne({
        where: { id },
        relations: {
          eventLikes: true,
          bookmarks: true,
          slots: true,
          ratings: true,
          notifications: true,
          categories: true
        }
      });

      if (!event) {
        throw new GraphQLError("Event not found", {
          extensions: {
            code: 'NOT_FOUND',
            field: 'id'
          }
        });
      }

      return event;
    });
  }

  async deleteEvent(id: number): Promise<Event> {
    return this.executeOperation(async () => {
      const event = await this.findOneByIdOrThrow(id);
      await this.repository.softDelete(id);
      return event;
    });
  }

  private validateEventStatus(status: string): void {
    if (!Object.values(EventStatus).includes(status as EventStatus)) {
      throw new GraphQLError("Invalid event status", {
        extensions: {
          code: 'BAD_USER_INPUT',
          field: 'status',
          validStatuses: Object.values(EventStatus)
        }
      });
    }
  }

  async getAvailableEvents(): Promise<Event[]> {
    return this.executeOperation(() => 
      this.repository.find({
        where: {
          status: EventStatus.ACTIVE
        }
      })
    );
  }

  async updateEventStatuses(): Promise<void> {
    try {
      const events = await this.repository.find();
      for (const event of events) {
        event.updateStatus();
        await this.repository.save(event);
      }
    } catch (error) {
      throw new Error(`Failed to update event statuses: ${error.message}`);
    }
  }
}
