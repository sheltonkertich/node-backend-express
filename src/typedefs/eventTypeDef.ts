export const eventTypeDef = `#graphql
# Event Entity
type Event {
  id: ID!
  organizer: String!
  time: String! # ISO format for timestamp
  location: String!
  category: String!
  status: String!
  coverImage: String!
  description: String!
  cost: Float!
  seatAvailable: Int!
  createdAt: String!
  updatedAt: String!
  likes: [EventLike!]!
  bookings: [EventBooking!]!
  bookmarks: [EventBookmark!]!
  ratings: [EventRating!]!
  notifications: [EventNotification!]!
}

# Event Bookmark Entity
type EventBookmark {
  id: ID!
  userId: String!
  event: Event!
}

# Event Booking Entity
type EventBooking {
  id: ID!
  event: Event!
  userId: String!
  bookedDate: String! # ISO format
  slotSet: String!
  slotsBooked: Int!
}

# Event Like Entity
type EventLike {
  id: ID!
  event: Event!
  userId: String!
}

# Event Category Entity
type EventCategory {
  id: ID!
  categoryName: String!
  createdAt: String! # ISO format
}

# Event Rating Entity
type EventRating {
  id: ID!
  event: Event!
  userId: String!
  scoreRating: Float! # Range from 1.0 to 5.0
}

# Event Notification Entity
type EventNotification {
  id: ID!
  event: Event!
  userId: String!
  content: String!
  status: String!
}

# Queries for fetching data
type Query {
    getEvent(id: ID!): Event
    getEvents: [Event!]!
    getEventBookmarks: [EventBookmark!]!
    getEventBookings: [EventBooking!]!
    getEventLikes: [EventLike!]!
    getEventCategories: [EventCategory!]!
    getEventRatings: [EventRating!]!
    getEventNotifications: [EventNotification!]!
}

# Mutations for creating, updating, and deleting data
type Mutation {
  createEvent(
    organizer: String!,
    time: String!,
    location: String!,
    category: String!,
    status: String!,
    coverImage: String!,
    description: String!,
    cost: Float!,
    seatAvailable: Int!
  ): Event!

  updateEvent(
    id: ID!,
    organizer: String,
    time: String,
    location: String,
    category: String,
    status: String,
    coverImage: String,
    description: String,
    cost: Float,
    seatAvailable: Int
  ): Event!

  deleteEvent(id: ID!): Boolean!

  createEventBookmark(userId: String!, eventId: ID!): EventBookmark!
  createEventBooking(userId: String!, eventId: ID!, slotSet: String!, slotsBooked: Int!): EventBooking!
  createEventLike(userId: String!, eventId: ID!): EventLike!
  createEventRating(userId: String!, eventId: ID!, scoreRating: Float!): EventRating!
  createEventNotification(userId: String!, eventId: ID!, content: String!, status: String!): EventNotification!

  deleteEventBookmark(id: ID!): Boolean!
  deleteEventBooking(id: ID!): Boolean!
  deleteEventLike(id: ID!): Boolean!
  deleteEventRating(id: ID!): Boolean!
  deleteEventNotification(id: ID!): Boolean!
}
`;
