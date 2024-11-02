import { Repository } from "typeorm";
import {EventTickets } from "../entities/Event";

export class EventTicketService {
    private eventTicketRepository: Repository<EventTickets>;

    constructor(eventTicketRepository: Repository<EventTickets>) {
        this.eventTicketRepository = eventTicketRepository;
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