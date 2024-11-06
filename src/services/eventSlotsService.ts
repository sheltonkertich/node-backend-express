import { Repository } from "typeorm";
import { EventSlots } from "../entities/Event";

export class EventSlotsService {
    private eventSlotsRepository: Repository<EventSlots>;

    constructor(eventSlotsRepository: Repository<EventSlots>) {
        this.eventSlotsRepository = eventSlotsRepository;
    }

    async getEventSlots(): Promise<EventSlots[] | null> {
        try {
            return await this.eventSlotsRepository.find({
                relations: {
                    event: true,
                }
            });
        } catch (error) {
            console.error("Error fetching all slots:", error);
            throw new Error("Failed to retrieve slots.");
        }
    }
    async getEventSlot(id: number, codeName: string): Promise<EventSlots | null> {
        console.log(id)
        if (id || codeName) { // Correctly check for truthy values
            try {
                // Build query options based on provided parameters
                const queryOptions: any = {};
                if (id) {
                    queryOptions.id = id;
                }
                if (codeName) {
                    queryOptions.codeName = codeName; // Assuming you want to search by codeName as well
                }
    
                const eventSlot = await this.eventSlotsRepository.findOne({
                    where: queryOptions,
                    relations: {
                        event: true,
                    }
                });
    
                if (!eventSlot) {
                    console.log(`No event slot found with slotID: ${id}, codeName: ${codeName}`);
                    return null; // Explicit null return if not found
                }
    
                //console.log('Event slot found:', eventSlot);
                return eventSlot;
    
            } catch (error) {
                console.error('Error fetching event slot:', error);
                throw error;
            }
        } else {
            //console.log('No slotID or codeName provided');
            return null; // Return null if neither parameter is provided
        }

    }
    async updateEventSlot(eventId: number, slotName: string, slostUpdates: Partial<EventSlots>) {
        console.log(eventId,)
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

        } catch (error: any) {
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