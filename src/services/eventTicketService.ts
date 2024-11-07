import { Repository } from "typeorm";
import { EventSlots, EventTickets } from "../entities/Event";
import { services } from "./index.js";
import { MutationResponse, EventUpdatesType, SlotsUpdatesType } from "../types/eventTypes.js";
import { GraphQLError } from "graphql";

export class EventTicketService {
    private eventTicketRepository: Repository<EventTickets>;

    constructor(eventTicketRepository: Repository<EventTickets>) {
        this.eventTicketRepository = eventTicketRepository;
    }
    async createTicket(slotId: number, slotName: string, userId: number, ticketType: string, quantity: number): Promise<EventTickets | null> {
        try {
            const user = await services.userService.getUserById(userId)
            const slot = await services.slotsService.getEventSlot(slotId, slotName)

            if (!user) {
                throw new GraphQLError("User not found");
            } if (!slot) {
                throw new GraphQLError(" slot not found");
            } 
            
            let availableTickets: number;
            let price;

            // Determine available tickets and price based on ticket type
            switch (ticketType) {
                case "VVIP":

                    availableTickets = slot.vvipAvailable;
                    price = slot.vvipPrice;
                    break;
                case "VIP":
                    availableTickets = slot.vipAvailable;
                    price = slot.vipPrice;
                    //console.log("the price is", price)
                    break;
                case "NORMAL":
                    availableTickets = slot.normalAvailable;
                    price = slot.normalPrice;
                    break;
                default:
                    throw new GraphQLError(`Invalid ticket type: ${ticketType}`);

            }

            // Check if enough tickets are available
            if (availableTickets < quantity) {
                //console.log("tunaangalia available tickets")
                throw new GraphQLError("Not enough tickets available for this type");
            }

            // Deduct available tickets based on type
            switch (ticketType) {
                case "VVIP":
                    slot.vvipAvailable -= quantity;
                    break;
                case "VIP":
                    slot.vipAvailable -= quantity;
                    break;
                case "NORMAL":
                    slot.normalAvailable -= quantity;
                    break;

                default:
                    throw new GraphQLError(`error occured in calculating event slots availablee`);
            }
            // console.log()
            // console.log(slotId, slotName, slot)
            await services.slotsService.updateEventSlot(slot.event.id, slotName, slot)

           // console.log(user?.id)
           // console.log(slot?.normalAvailable)
            return null;


        } catch (error: any) {
            //console.log(error.code)
            const errorCode = error.code || error.extensions.code || 'UNKNOWN_ERROR';
            const errorMessage = error.detail || error.message || 'An unexpected error occurred.';
          //  console.error(`booking service Error creating ticket: ${errorMessage}`, error);
            throw new GraphQLError(`Failed to book slot. Error Code: ${errorCode}. Message: ${errorMessage}`);
        }



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