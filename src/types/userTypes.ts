// types.ts

import { EventBookmarks, EventLikes, EventRatings } from "../entities/Event";
import { User, UserProfile } from "../entities/User";

// Base response interface
export interface BaseResponse {
  success: boolean;
  message: string;
  errorCode?: string;
  errorDetail?: string;
}

// Response types
export interface UserMutationResponse extends BaseResponse {
  singleUser?: User | null;
  singleProfile?: UserProfile | null;
}

export interface UserQueryResponse extends BaseResponse {
  users?: User[] | null;
  user?: User | null;
  userEventLikes?: EventLikes[];
  userEventLike?: EventLikes;
  userEventBookmarks?: EventBookmarks[];
  userEventBookmark?: EventBookmarks;
  userEventRatings?: EventRatings[];
  userEventRating?: EventRatings;
}

// User related interfaces
export interface UserBase {
  firstName: string;
  lastName?: string;
  email: string;
  age?: number;
}

export type UserInput = UserBase;

export type UserUpdates = Partial<UserBase>;
  