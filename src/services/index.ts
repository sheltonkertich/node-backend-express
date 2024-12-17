import { AuthService } from './authService';
import { UserService } from './userService';
import { EventService } from './eventService';
import { EventLikeService } from './eventLikeService';
import { EventBookmarkService } from './eventBookmarkService';
import { OrganizerService } from './organizerService';
import { StorageService } from './storageService';

const services = {
    auth: new AuthService(),
    user: new UserService(),
    event: new EventService(),
    eventLike: new EventLikeService(),
    eventBookmark: new EventBookmarkService(),
    organizer: new OrganizerService(),
    storage: new StorageService()
} as const;

export type Services = typeof services;
export default services;