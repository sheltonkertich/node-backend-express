import { 
  Event, 
  EventCategories, 
  EventLikes, 
  EventBookmarks, 
  EventRatings, 
  EventSlots, 
  EventTickets, 
  EventNotifications 
} from "../entities/Event";

export enum EventStatus {
  ACTIVE = "active",
  ENDED = "ended",
  CANCELLED = "cancelled",
  DRAFT = "draft" 
}

export interface BaseResponse {
  success: boolean;
  message: string;
  errorCode?: string;
  errorDetail?: string | object;
}

export interface MutationResponse extends BaseResponse {
  singleEvent?: Event;
  singleEventLike?: EventLikes;
  singleSlot?: EventSlots;
  singleEventBookmark?: EventBookmarks;
  singleTicket?: EventTickets;
  singleRating?: EventRatings;
  singleNotification?: EventNotifications;
  categories?: EventCategories[];
}

export interface EventResponse extends BaseResponse {
  events?: Event[];
  event?: Event;
  categories?: EventCategories[];
  category?: EventCategories;
}

export interface CategoryResponse extends BaseResponse {
  category?: EventCategories;
  categories?: EventCategories[];
}

export interface EventInputType {
  organizer: string;
  time: Date;
  location: string;
  status: EventStatus;
  coverImage?: string;
  description: string;
  cost: number;
  seatAvailable: number;
  categories?: EventCategories[];
}

export interface EventUpdateInput {
  organizer?: string;
  time?: Date;
  location?: string;
  status?: EventStatus;
  coverImage?: string;
  description?: string;
  cost?: number;
  seatAvailable?: number;
  categories?: EventCategories[];
}

export interface CategoryInput {
  name: string;
  description?: string;
}

export interface CategoryUpdateInput {
  name?: string;
  description?: string;
}

export type EventUpdatesType = {
  // Define your event update properties here
  title?: string;
  description?: string;
  date?: Date;
  // ... add other optional properties
}
export type SlotsUpdatesType = {
  capacity?: number;
  startTime?: Date;
  endTime?: Date;
  status?: string;
  // Add any other slot-related fields that can be updated
};;
