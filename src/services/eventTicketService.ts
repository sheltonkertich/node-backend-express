import { Repository } from "typeorm";
import { EventTickets, EventSlots, TicketType } from "../entities/Event.js";
import { services } from "./index.js";
import { BaseService } from "./baseService.js";
import { GraphQLError } from "graphql";

interface TicketPricing {
  price: number;
  availableTickets: number;
}

export class EventTicketService extends BaseService<EventTickets> {
  constructor(eventTicketRepository: Repository<EventTickets>) {
    super(eventTicketRepository);
  }

  private validateTicketQuantity(
    quantity: number, 
    availableTickets: number, 
    ticketType: keyof typeof TicketType
  ): void {
    if (quantity <= 0) {
      throw new GraphQLError("Quantity must be greater than 0", {
        extensions: {
          code: 'BAD_USER_INPUT',
          field: 'quantity'
        }
      });
    }

    if (quantity > availableTickets) {
      throw new GraphQLError(
        `Not enough ${ticketType} tickets available. Only ${availableTickets} tickets left`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            field: 'quantity',
            available: availableTickets
          }
        }
      );
    }
  }

  private calculateTicketPrice(
    ticketType: keyof typeof TicketType, 
    slot: EventSlots
  ): TicketPricing {
    if (!Object.keys(TicketType).includes(ticketType)) {
      throw new GraphQLError(`Invalid ticket type: ${ticketType}`, {
        extensions: {
          code: 'BAD_USER_INPUT',
          field: 'ticketType',
          validTypes: Object.keys(TicketType)
        }
      });
    }

    const pricing: Record<keyof typeof TicketType, TicketPricing> = {
      VVIP: { 
        price: slot.vvipPrice, 
        availableTickets: slot.vvipAvailable 
      },
      VIP: { 
        price: slot.vipPrice, 
        availableTickets: slot.vipAvailable 
      },
      NORMAL: { 
        price: slot.normalPrice, 
        availableTickets: slot.normalAvailable 
      }
    };

    return pricing[ticketType];
  }

  async createTicket(
    slotId: number, 
    slotName: string, 
    userId: number, 
    ticketType: keyof typeof TicketType, 
    quantity: number
  ): Promise<EventTickets> {
    return this.executeOperation(async () => {
      if (!slotName?.trim()) {
        throw new GraphQLError("Slot name is required", {
          extensions: {
            code: 'BAD_USER_INPUT',
            field: 'slotName'
          }
        });
      }

      // Fetch user and slot in parallel
      const [, slot] = await Promise.all([
        services.userService.getUserById(userId),
        services.slotsService.getEventSlot(slotId, slotName)
      ]).catch((error) => {
        if (error instanceof GraphQLError) {
          throw error;
        }
        throw new GraphQLError("Failed to fetch user or slot", {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        });
      });

      if (!slot) {
        throw new GraphQLError(`No slot found with ID ${slotId} and name ${slotName}`, {
          extensions: {
            code: 'NOT_FOUND',
            field: 'slotId'
          }
        });
      }

      const { price, availableTickets } = this.calculateTicketPrice(ticketType, slot);
      this.validateTicketQuantity(quantity, availableTickets, ticketType);

      const newTicket = this.repository.create({
        slot: { id: slotId },
        user: { id: userId },
        ticketType: TicketType[ticketType],
        price: price * quantity,
        quantity,
        slotName
      });

      try {
        const savedTicket = await this.repository.save(newTicket);
        await services.slotsService.updateEventSlot(slot.event.id, slotName, slot);
        return savedTicket;
      } catch (error) {
        throw new GraphQLError("Failed to create ticket", {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        });
      }
    });
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