import { Repository } from "typeorm";
import { EventNotifications } from "../entities/Event";

export class EventNotificationService {
  private eventNotificationsRepository: Repository<EventNotifications>;

  constructor(eventNotificationsRepository: Repository<EventNotifications>) {
    this.eventNotificationsRepository = eventNotificationsRepository;
  }

  async getAllNotifications(): Promise<EventNotifications[]> {
    return await this.eventNotificationsRepository.find({ relations: ['event'] });
  }

  async createNotification() {
    // const newNotification = this.eventNotificationsRepository.create({ userId, event: { id: eventId }, content, status });
    // return await this.eventNotificationsRepository.save(newNotification);
  }

  async deleteNotification(id: number): Promise<EventNotifications | null> {
    const notification = await this.eventNotificationsRepository.findOneBy({ id });
    if (!notification) return null;
    await this.eventNotificationsRepository.softDelete({ id });
    return notification;
  }
}