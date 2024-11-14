// types.ts

import { EventBookmarks, EventLikes, EventRatings } from "../entities/Event";
import { User, UserProfile } from "../entities/User";

// User entity type
// export type User = {
//     id: number;
//     firstName: string;
//     lastName?: string; // Optional
//     age?: number;      // Optional
//     email: string;
//   };
  export type UserMutationResponse = {
    success?: boolean;
    message?: string;
    singleUser?: User | null;
    singleProfile?: UserProfile | null;
    errorCode?: string;
    errorDetail?: string;
};
export type UserQueryResponse = {
  success: boolean
  message: string
  users?:User[] | null
  user?:User |null
  userEventLikes?:EventLikes[]
  userEventLike?:EventLikes
  UserEventBookmarks?:EventBookmarks[]
  UserEventBookmark?:EventBookmarks
  UserEventRatings?:EventRatings[]
  UserEventRating?:EventRatings
  UserErrorCode?: String
  UserErrorDetail?: String
}

  // Input type for creating a new user
  export type UserInput = {
    firstName: string;
    lastName?: string; // Optional
    age?: number;      // Optional
    email: string;
  };
  
  // Input type for updating an existing user
  export type UserUpdates = {
    firstName?: string; 
    lastName?: string;
    email?: string; 
    profile?: UserProfile
  };
  
  // Response type for mutations
  // export type MutationResponse = {
  //   success: boolean;
  //   message: string;
  //   user: User | null;  // The user may be null if the operation failed or the user was not found
  //   errorCode?: any; 
  //   errorDetail?: any;
  // };
  