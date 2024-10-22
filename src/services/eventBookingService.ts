import { Repository } from "typeorm";
import { EventBookings } from "../entities/Event";

export class EventBookingService {
  private eventBookingsRepository: Repository<EventBookings>;

  constructor(eventBookingsRepository: Repository<EventBookings>) {
    this.eventBookingsRepository = eventBookingsRepository;
  }

  async getAllBookings(): Promise<EventBookings[]> {
    return await this.eventBookingsRepository.find({ relations: ["event"] });
  }

  async getBooking(id: number): Promise<EventBookings | null> {
    return await this.eventBookingsRepository.findOneBy({ id });
  }

  async createBooking(

  ) {
   
  }

  async deleteBooking(id: number){
   
  }
}
