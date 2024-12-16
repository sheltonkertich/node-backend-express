export enum UserType {
  NORMAL_USER = 'NORMAL_USER',
  ORGANIZER = 'ORGANIZER',
  ADMIN = 'ADMIN'
}

export interface User {
  $id: string;
  firstName: string;
  lastName?: string;
  email: string;
  userType: UserType;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  $id: string;
  userId: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName?: string;
  email: string;
  userType?: UserType;
  imageUrl?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  userType?: UserType;
  imageUrl?: string;
} 