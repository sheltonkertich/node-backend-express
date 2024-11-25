import { AppDataSource } from "../data-source.js";
import { 
  Event, 
  EventCategories, 
  EventLikes,
  EventBookmarks,
  EventTickets,
  EventRatings,
  EventNotifications,
  EventSlots
} from "../entities/Event.js";
import { User } from "../entities/User.js";
import { UserProfile } from "../entities/User.js";
import { EventService } from "./eventService.js";
import { CategoryService } from "./categoryService.js";
import { EventLikeService } from "./eventLikeService.js";
import { EventBookmarkService } from "./eventBookmarkService.js";
import { EventTicketService } from "./eventTicketService.js";
import { EventRatingService } from "./eventRatingService.js";
import { EventNotificationService } from "./eventNotificationService.js";
import { EventSlotsService } from "./eventSlotsService.js";
import { UserService } from "./userService.js";
import { UserProfileService } from './userProfileService.js';
import { Repository } from "typeorm";

const repositories = {
  event: AppDataSource.getRepository(Event),
  eventCategory: AppDataSource.getRepository(EventCategories),
  eventLikes: AppDataSource.getRepository(EventLikes),
  eventBookmarks: AppDataSource.getRepository(EventBookmarks),
  eventTickets: AppDataSource.getRepository(EventTickets),
  eventRatings: AppDataSource.getRepository(EventRatings),
  eventNotifications: AppDataSource.getRepository(EventNotifications),
  eventSlots: AppDataSource.getRepository(EventSlots),
  user: AppDataSource.getRepository(User),
  userProfile: AppDataSource.getRepository(UserProfile) as Repository<UserProfile>
} as const;

export const services = {
  eventService: new EventService(repositories.event),
  categoryService: new CategoryService(repositories.eventCategory),
  likesService: new EventLikeService(repositories.eventLikes),
  bookmarkService: new EventBookmarkService(repositories.eventBookmarks),
  ticketsService: new EventTicketService(repositories.eventTickets),
  ratingsService: new EventRatingService(repositories.eventRatings),
  notificationService: new EventNotificationService(repositories.eventNotifications),
  slotsService: new EventSlotsService(repositories.eventSlots),
  userService: new UserService(repositories.user),
  userProfileService: new UserProfileService(repositories.userProfile)
} as const;

export type Services = typeof services;

export default services;