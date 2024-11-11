import { Repository } from "typeorm";
import { EventTickets, TicketType } from "../entities/Event.js";
import { services } from "./index.js";
import { GraphQLError } from "graphql";
import { handleError } from "../utils/handleError.js";
import validateUserEventSlot from "../utils/validateUserAndEvent.js";

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
            if (quantity == 0 || quantity < 0) {
                throw new GraphQLError(`quantity must be greater than 0`);
            } else if (quantity > availableTickets) {
                throw new GraphQLError(`Not enough tickets available for this type. available tickets are ${availableTickets}`);
            }
            else if (availableTickets === 0) {
                throw new GraphQLError(`the slots are fully booked`);
            }

            // Deduct available tickets based on type
            switch (ticketType) {
                case "VVIP":
                    slot.vvipAvailable -= quantity;
                    price = quantity* price;
                    break;
                case "VIP":
                    slot.vipAvailable -= quantity;
                    price = quantity* price;
                    break;
                case "NORMAL":
                    slot.normalAvailable -= quantity;
                    price = quantity* price;
                    break;

                default:
                    throw new GraphQLError(`error occured in calculating event slots availablee`);
            }
            const newTicket = this.eventTicketRepository.create({
                slot: {id:slotId }, 
                user: { id: userId },
                ticketType: TicketType[ticketType],
                price: price,
                quantity: quantity,
                slotName: slotName
              })
            //console.log(newTicket)
            try {
               const savedTicket = await this.eventTicketRepository.save(newTicket);
                if (!savedTicket) {
                    throw new GraphQLError("Error creating event ticket");
                } await services.slotsService.updateEventSlot(slot.event.id, slotName, slot)
            } catch (error) {
                throw handleError(error);
            }
            // console.log(user?.id)
            // console.log(slot?.normalAvailable)
            return null;


        } catch (error) {
            throw handleError(error);
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