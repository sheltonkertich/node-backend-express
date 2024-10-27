import { Repository } from "typeorm";
import { EventSlots } from "../entities/Event";

export class EventSlotsService {
    private eventSlotsRepository: Repository<EventSlots>;

    constructor(eventSlotsRepository: Repository<EventSlots>) {
        this.eventSlotsRepository = eventSlotsRepository;
    }

    async getEventSlots() {

    }
    async getEventSlot() {

    }

    async createEventSlots(eventID: number, slotsData: Partial<EventSlots>): Promise<EventSlots> {
        try {
            console.log('slotsData:', slotsData);
            const slots = this.eventSlotsRepository.create({
                event: { id: eventID },
                capacity: slotsData.capacity,
                vvipAvailable: slotsData.vvipAvailable,
                vipAvailable: slotsData.vipAvailable,
                normalAvailable: slotsData.normalAvailable,
                
            });
           return await this.eventSlotsRepository.save(slots);

        } catch (error: any) {
            const errorCode = error.code || 'UNKNOWN_ERROR';
            const errorMessage = error.detail || 'An unexpected error occurred.';
            console.error(`Service Error creating eventslot: ${errorMessage}`, error);
            throw new Error(`Failed to create eventslot. Error Code: ${errorCode}. Message: ${errorMessage}`);
        }
    }

    async ddeleteEventSlot() {

    }
}