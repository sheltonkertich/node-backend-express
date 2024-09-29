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
    userId: string,
    eventId: number,
    slotSet: string,
    slotsBooked: number
  ): Promise<EventBookings> {
    const newBooking = this.eventBookingsRepository.create({
      userId,
      event: { id: eventId },
      slotSet,
      slotsBooked,
    });
    return await this.eventBookingsRepository.save(newBooking);
  }

  async deleteBooking(id: number): Promise<EventBookings | null> {
    const booking = await this.eventBookingsRepository.findOneBy({ id });
    if (!booking) return null;
    await this.eventBookingsRepository.softDelete({ id });
    return booking;
  }
}
