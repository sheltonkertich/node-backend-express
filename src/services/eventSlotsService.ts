import { Repository } from "typeorm";
import { EventSlots } from "../entities/Event.js";
import { BaseService } from "./baseService.js";

export class EventSlotsService extends BaseService<EventSlots> {
  constructor(eventSlotsRepository: Repository<EventSlots>) {
    super(eventSlotsRepository);
  }

  async getEventSlots(): Promise<EventSlots[]> {
    return this.executeOperation(() => 
      this.repository.find({
        relations: {
          event: true,
        }
      })
    );
  }

  async getEventSlot(id: number, codeName: string): Promise<EventSlots | null> {
    return this.executeOperation(async () => {
      if (!id && !codeName) {
        return null;
      }

      const queryOptions: any = {};
      if (id) {
        queryOptions.id = id;
      }
      if (codeName) {
        queryOptions.codeName = codeName;
      }

      const eventSlot = await this.repository.findOne({
        where: queryOptions,
        relations: {
          event: true,
        }
      });

      if (!eventSlot) {
        this.throwNotFoundError("EventSlot", `${id || codeName}`);
      }

      return eventSlot;
    });
  }

  async updateEventSlot(
    eventId: number, 
    slotName: string, 
    slotUpdates: Partial<EventSlots>
  ): Promise<EventSlots | null> {
    return this.executeOperation(async () => {
      if (!Object.keys(slotUpdates).length) {
        this.throwValidationError("No valid fields provided for slots update.");
      }

      const slots = await this.repository.findOne({ 
        where: { 
          codeName: slotName, 
          event: { id: eventId } 
        }
      });

      if (!slots) {
        this.throwNotFoundError(
          "EventSlot", 
          `codename ${slotName} for event ${eventId}`
        );
      }

      const result = await this.repository.update(slots.id, slotUpdates);
      
      if (result.affected === 0) {
        this.throwValidationError(`Failed to update slot with id ${slots.id}`);
      }

      return this.repository.findOne({ 
        where: { 
          codeName: slotName, 
          event: { id: eventId } 
        }
      });
    });
  }
}