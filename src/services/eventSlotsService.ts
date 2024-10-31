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
    async updateEventSlot(eventId: number, slotName: string, slostUpdates: Partial<EventSlots>) {
        try {
            if (!Object.keys(slostUpdates).length) {
                throw new Error("No valid fields provided for slots update.");
            }
            const slots = await this.eventSlotsRepository.findOne({ where: { codeName: slotName, event: { id: eventId } }, })
            // const slotsId:number = slots?.id
            if (slots) {
                const result = await this.eventSlotsRepository.update(slots.id, slostUpdates);
                if (result.affected === 0) {
                    throw new Error(`slot found but updating it failed slot id ${slots.id}`);
                }
            } else {
                throw new Error(`slot with codename ${slotName} associated with event_id ${eventId} not found. Update failed`)
            }
            return await this.eventSlotsRepository.findOne({ where: { codeName: slotName, event: { id: eventId } }, })

        } catch (error:any) {
            const errorCode = error.code || 'UNKNOWN_ERROR';
            const errorMessage = error.detail || error.message || 'An unexpected error occurred.';
            console.error(`Slot Service Error updating slot: ${errorMessage}`, error);
            throw new Error(`Failed to update slot. Error Code: ${errorCode}. Message: ${errorMessage}`);
         
        }

    }
    async ddeleteEventSlot() {

    }
}




//-----------code for getting relations---------------//
// const event = await this.eventRepository.findOne({
//     where: {
//       id:eventId,
//       slots: { codeName: slotName },
//     },
//     relations: {
//       slots: true,
//     },
//   })