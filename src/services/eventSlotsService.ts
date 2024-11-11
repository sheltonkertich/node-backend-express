import { Repository } from "typeorm";
import { EventSlots } from "../entities/Event";
import { GraphQLError } from "graphql";
import { handleError } from "../utils/handleError.js";

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
            // console.error("Error fetching all slots:", error);

            throw new GraphQLError(`Failed to retrieve slots.`);
        }
    }
    async getEventSlot(id: number, codeName: string): Promise<EventSlots | null> {
       // console.log(id)
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
                    throw new GraphQLError(`No event slot found with slotID: ${id}, codeName: ${codeName}`, { extensions: { code: 'EVENT_NOT_FOUND' }, });
                    return null; // Explicit null return if not found
                }

                //console.log('Event slot found:', eventSlot);
                return eventSlot;

            } catch (error) {
                throw handleError(error);
            }
        } else {
            //console.log('No slotID or codeName provided');
            return null; // Return null if neither parameter is provided
        }

    }
    async updateEventSlot(eventId: number, slotName: string, slostUpdates: Partial<EventSlots>) {
        //console.log(eventId,)
        try {
            if (!Object.keys(slostUpdates).length) {
                throw new Error("No valid fields provided for slots update.");
            }
            const slots = await this.eventSlotsRepository.findOne({ where: { codeName: slotName, event: { id: eventId } }, })
            // const slotsId:number = slots?.id
            if (slots) {
                const result = await this.eventSlotsRepository.update(slots.id, slostUpdates);
                if (result.affected === 0) {
                    throw new GraphQLError(`slot found but updating it failed slot id ${slots.id}`);
                }
            } else {
                throw new GraphQLError(`slot with codename ${slotName} associated with event_id ${eventId} not found. Update failed`)

            }
            return await this.eventSlotsRepository.findOne({ where: { codeName: slotName, event: { id: eventId } }, })

        } catch (error) {
            throw handleError(error);
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