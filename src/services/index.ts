import { UserService } from './userService';
import { EventService } from './eventService';
import { TourService } from './tourService';
import { OrganizerService } from './organizerService';
import { EventLikeService } from './eventLikeService';
import { EventBookmarkService } from './eventBookmarkService';

// Initialize services
export const services = {
  userService: new UserService(),
  eventService: new EventService(),
  tourService: new TourService(),
  organizerService: new OrganizerService(),
  eventLikeService: new EventLikeService(),
  eventBookmarkService: new EventBookmarkService(),
};

// Export service types
export type Services = typeof services;

// Export individual services for direct imports
export {
  UserService,
  EventService,
  TourService,
  OrganizerService,
  EventLikeService,
  EventBookmarkService,
};