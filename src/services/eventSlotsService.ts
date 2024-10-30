import { Repository } from "typeorm";
import { EventSlots } from "../entities/Event";

export class EventSlotsService {
    private eventSlotsRepository: Repository<EventSlots>;

    constructor(eventSlotsRepository: Repository<EventSlots>) {
        this.eventSlotsRepository = eventSlotsRepository;
    }

    async getEventSlots() {

    }
    async getEventSlot(slotName: string,slostUpdates:Partial<EventSlots>) {
        console.log("tuko kwa slot service", slotName, slostUpdates)
    }
    async ddeleteEventSlot() {

    }
}