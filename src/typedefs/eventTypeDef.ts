export const eventTypeDef = `#graphql
# Event Entity
type MutationResponse {
    success: Boolean
    message: String
    singleEvent:Event
    singleEventLike:EventLike
    errorCode: String
    errorDetail: String
}
type EventsResponse {
    success: Boolean
    message: String
    events: [Event]
    event: Event
    eventLikes:[EventLike]
    eventLike:EventLike
    errorCode: String
    errorDetail: String
}

type Event {
  id: ID!
  organizer: String
  time: String # ISO format for timestamp
  location: String
  category: String
  status: String
  coverImage: String
  description: String
  cost: Float
  seatAvailable: Int
  createdAt: String
  updatedAt: String
  eventLikes: [EventLike]
  bookings: [EventBooking]
  bookmarks: [EventBookmark]
  ratings: [EventRating]
  notifications: [EventNotification]
}
input EventInput {
  organizer: String!
  time: String! # ISO format for timestamp
  location: String!
  category: String!
  status: String!
  coverImage: String
  description: String!
  cost: Float!
  seatAvailable: Int!
  createdAt: String! # ISO format for timestamp
  updatedAt: String!
  # likes: [EventLike]
  # bookings: [EventBooking]
  # bookmarks: [EventBookmark]
  # ratings: [EventRating]
  # notifications: [EventNotification]
}
input EventUpdates {
  organizer: String
  time: String # ISO format for timestamp
  location: String
  category: String
  status: String
  coverImage: String
  description: String
  cost: Float
  seatAvailable: Int
  createdAt: String
  updatedAt: String
  # likes: [EventLike]
  # bookings: [EventBooking]
  # bookmarks: [EventBookmark]
  # ratings: [EventRating]
  # notifications: [EventNotification]
}
# Event Like Entity
type EventLike {
  id: ID!
  event: Event
  user: User
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
    getEvent(id: ID!): EventsResponse
    getEvents: EventsResponse
    getEventLike(id:ID!, userID: ID, eventID: ID):EventsResponse
    getAllLikes: EventsResponse
    
    getEventBookmarks: [EventBookmark!]!
    getEventBookings: [EventBooking!]!
    getEventCategories: [EventCategory!]!
    getEventRatings: [EventRating!]!
    getEventNotifications: [EventNotification!]!
}

# Mutations for creating, updating, and deleting data
type Mutation {
  #deleteMultipleEvents()
  #deleteMultipleUsers()
  createEvent( input:EventInput! ): MutationResponse
  updateEvent(id: ID!, eventUpdates:EventUpdates): MutationResponse
  deleteEvent(id: ID!): MutationResponse
  createEventLike(userId: ID!, eventId: ID!):MutationResponse
  createEventBookmark(userId: String!, eventId: ID!): MutationResponse
  # --------first section trial
  createEventBooking(userId: String!, eventId: ID!, slotSet: String!, slotsBooked: Int!): EventBooking!
  createEventRating(userId: String!, eventId: ID!, scoreRating: Float!): EventRating!
  createEventNotification(userId: String!, eventId: ID!, content: String!, status: String!): EventNotification!

  deleteEventBookmark(id: ID!): Boolean!
  deleteEventBooking(id: ID!): Boolean!
  deleteEventLike(id: ID!): Boolean!
  deleteEventRating(id: ID!): Boolean!
  deleteEventNotification(id: ID!): Boolean!
}
`;
