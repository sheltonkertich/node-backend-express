import { Repository } from "typeorm";
import { EventNotifications,NotificationStatus,NotificationType } from "../entities/Event";
import { services } from "./index.js";
import { GraphQLError } from "graphql";
import { handleError } from "../utils/handleError.js";

export class EventNotificationService {
  private eventNotificationsRepository: Repository<EventNotifications>;

  constructor(eventNotificationsRepository: Repository<EventNotifications>) {
    this.eventNotificationsRepository = eventNotificationsRepository;
  }

  async getAllNotifications(): Promise<EventNotifications[]> {
    return await this.eventNotificationsRepository.find({ relations: ['event'] });
  }

  async createNotification(userId: number, eventId: number, content: string, status: string,notificationType: string): Promise<EventNotifications | null> {
    try {
      const user = await services.userService.getUserById(userId)
      const event = await services.eventService.getEventById(eventId)

      if (!user) {
        throw new GraphQLError("User not found");
      } if (!event) {
        throw new GraphQLError(" event not found");
      }

      const newNotification = this.eventNotificationsRepository.create({
        event: { id: eventId },
        user: { id: userId },
        content: content,
        type: notificationType as NotificationType,
        status: status as NotificationStatus
      });

      return await this.eventNotificationsRepository.save(newNotification);

    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteNotification(id: number): Promise<EventNotifications | null> {
    const notification = await this.eventNotificationsRepository.findOneBy({ id });
    if (!notification) return null;
    await this.eventNotificationsRepository.softDelete({ id });
    return notification;
  }
}