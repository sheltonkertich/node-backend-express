// types.ts

// User entity type
export type User = {
    id: number;
    firstName: string;
    lastName?: string; // Optional
    age?: number;      // Optional
    email: string;
  };
  
  // Input type for creating a new user
  export type UserInput = {
    firstName: string;
    lastName?: string; // Optional
    age?: number;      // Optional
    email: string;
  };
  
  // Input type for updating an existing user
  export type UserUpdates = {
    firstName?: string; // Optional
    lastName?: string;  // Optional
    age?: number;       // Optional
    email?: string;     // Optional
  };
  
  // Response type for mutations
  export type MutationResponse = {
    success: boolean;
    message: string;
    user: User | null;  // The user may be null if the operation failed or the user was not found
    errorCode?: any; 
    errorDetail?: any;
  };
  