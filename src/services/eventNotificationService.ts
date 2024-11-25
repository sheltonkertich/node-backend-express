import { Repository } from "typeorm";
import { EventNotifications, NotificationStatus, NotificationType } from "../entities/Event.js";
import { services } from "./index.js";
import { BaseService } from "./baseService.js";

export class EventNotificationService extends BaseService<EventNotifications> {
  constructor(eventNotificationsRepository: Repository<EventNotifications>) {
    super(eventNotificationsRepository);
  }

  private validateNotificationType(type: string): asserts type is NotificationType {
    if (!Object.values(NotificationType).includes(type as NotificationType)) {
      this.throwValidationError(`Invalid notification type: ${type}`);
    }
  }

  private validateNotificationStatus(status: string): asserts status is NotificationStatus {
    if (!Object.values(NotificationStatus).includes(status as NotificationStatus)) {
      this.throwValidationError(`Invalid notification status: ${status}`);
    }
  }

  async getAllNotifications(): Promise<EventNotifications[]> {
    return this.executeOperation(() => 
      this.repository.find({ 
        relations: {
          event: true,
          user: true
        }
      })
    );
  }

  async getNotificationsByUser(userId: number): Promise<EventNotifications[]> {
    return this.executeOperation(() =>
      this.repository.find({
        where: { user: { id: userId } },
        relations: {
          event: true
        }
      })
    );
  }

  async getNotificationsByEvent(eventId: number): Promise<EventNotifications[]> {
    return this.executeOperation(() =>
      this.repository.find({
        where: { event: { id: eventId } },
        relations: {
          user: true
        }
      })
    );
  }

  async createNotification(
    userId: number, 
    eventId: number, 
    content: string, 
    status: string,
    notificationType: string
  ): Promise<EventNotifications> {
    return this.executeOperation(async () => {
      // Validate inputs
      this.validateNotificationType(notificationType);
      this.validateNotificationStatus(status);

      // Check if user and event exist
      await Promise.all([
        services.userService.getUserById(userId),
        services.eventService.getEventById(eventId)
      ]);

      const newNotification = this.repository.create({
        event: { id: eventId },
        user: { id: userId },
        content,
        type: notificationType as NotificationType,
        status: status as NotificationStatus
      });

      return await this.repository.save(newNotification);
    });
  }

  async updateNotificationStatus(
    id: number, 
    status: string
  ): Promise<EventNotifications> {
    return this.executeOperation(async () => {
      this.validateNotificationStatus(status);

      const result = await this.repository.update(id, { 
        status: status as NotificationStatus 
      });

      if (result.affected === 0) {
        this.throwNotFoundError("EventNotification", id);
      }

      return await this.findOneByIdOrThrow(id, ['event', 'user']);
    });
  }

  async deleteNotification(id: number): Promise<void> {
    return this.executeOperation(async () => {
      const result = await this.repository.softDelete({ id });
      
      if (result.affected === 0) {
        this.throwNotFoundError("EventNotification", id);
      }
    });
  }
}