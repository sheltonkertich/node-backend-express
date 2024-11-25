export const eventTypeDef = `#graphql
# Response Types
type MutationResponse {
  success: Boolean
  message: String
  singleEvent: Event
  singleEventLike: EventLike
  singleSlot: EventSlots
  singleEventBookmark: EventBookmark
  singleTicket: EventTickets
  singleRating: EventRating
  singleCategory: EventCategory
  categories: [EventCategory]
  errorCode: String
  errorDetail: String
}

type EventsResponse {
  success: Boolean
  message: String
  events: [Event]
  event: Event
  eventLikes: [EventLike]
  eventLike: EventLike
  eventBookmarks: [EventBookmark]
  eventBookmark: EventBookmark
  eventSlot: Slot
  allSlots: [Slot]
  errorCode: String
  errorDetail: String
}

# Core Types
type Event {
  id: ID!
  organizer: String!
  time: String! # ISO format
  location: String!
  category: String!
  status: EventStatus!
  coverImage: String
  description: String!
  cost: Float!
  seatAvailable: Int!
  createdAt: String!
  updatedAt: String!
  eventLikes: [EventLike]
  bookmarks: [EventBookmark]
  ratings: [EventRating]
  categories: [EventCategory]
  notifications: [EventNotification]
  slots: [EventSlots]
}

type EventSlots {
  id: ID!
  startTime: String!
  endTime: String!
  codeName: String!
  capacity: Int!
  vvipAvailable: Int!
  vipAvailable: Int!
  normalAvailable: Int!
  tickets: [EventTickets!]!
}

type Slot {
  id: ID
  event: Event
  codeName: String
  capacity: Int
  vvipAvailable: Int
  vipAvailable: Int
  normalAvailable: Int
  tickets: [EventTickets!]
}

# Related Types
type EventLike {
  id: ID!
  event: Event
  user: User
}

type EventBookmark {
  id: ID!
  user: User!
  event: Event!
}

type EventBooking {
  id: ID!
  event: Event!
  userId: String!
  bookedDate: String! # ISO format
  slotSet: String!
  slotsBooked: Int!
}

type EventCategory {
  id: ID
  categoryName: String
  description: String
  createdAt: String # ISO format
  events: [Event]
}
type CategoryResponse {
    success: Boolean!
    message: String
    category: EventCategory
    categories: [EventCategory]
    errorCode: String
    errorDetail: String
  }
  input CategoryInput {
    name: String!
    description: String
  }
  input CategoryUpdateInput {
    name: String
    description: String
  }
type EventRating {
  id: ID!
  event: Event!
  userId: String!
  scoreRating: Float! # Range from 1.0 to 5.0
  review: String
}

type EventNotification {
  id: ID!
  event: Event!
  userId: String!
  content: String!
  status: NotificationStatus!
  type: NotificationType
}

type EventTickets {
  id: ID!
  ticketType: TicketType!
  price: Float!
  quantity: Int!
}

# Input Types
input EventInput {
  organizer: String!
  time: String!
  startTime: String!
  endTime: String!
  location: String!
  category: String!
  status: String!
  coverImage: String
  description: String!
  cost: Float!
  slots: [SlotsInput]
  categoryIds: [ID!]
}

input EventUpdates {
  organizer: String
  time: String
  location: String
  category: String
  status: EventStatus
  coverImage: String
  description: String
  cost: Float
  seatAvailable: Int
  createdAt: String
  updatedAt: String
  slots: [SlotsUpdates]
}

input SlotsInput {
  startTime: String!
  endTime: String!
  capacity: Int!
  codeName: String!
  vvipAvailable: Int
  vipAvailable: Int
  normalAvailable: Int
  vvipPrice: Int
  vipPrice: Int
  normalPrice: Int
}

input SlotsUpdates {
  startTime: String
  endTime: String
  capacity: Int
  codeName: String
  vvipAvailable: Int
  vipAvailable: Int
  normalAvailable: Int
}

# Enums
enum EventStatus {
  AVAILABLE
  UNAVAILABLE
  COMPLETED
  CANCELLED
  UPCOMING
}

enum TicketType {
  NORMAL
  VIP
  VVIP
}

enum NotificationStatus {
  READ
  UNREAD
}

enum NotificationType {
  EVENT_REMINDER
  BOOKING_CONFIRMATION
  TICKET_UPDATE
  FRIEND_REQUEST
  SYSTEM_ALERT
  PROMOTIONAL
}

# Queries
type Query {
  getEvent(id: ID!): EventsResponse
  getEvents: EventsResponse
  getEventLike(id: ID!, userID: ID, eventID: ID): EventsResponse
  getAllLikes: EventsResponse
  getEventBookmark(id: ID!, userID: ID, eventID: ID): EventsResponse
  getAllEventBookmarks: EventsResponse
  getAllslots: EventsResponse
  getEventSlot(id: ID, codeName: String): EventsResponse
  getEventBookings: [EventBooking!]!
  getEventRatings: [EventRating!]!
  getEventNotifications: [EventNotification!]!
     # Category Queries
    getCategory(id: ID!): CategoryResponse!
    getAllCategories: CategoryResponse
    getEventsByCategory(categoryId: ID!): EventsResponse!
    getEventsByCategories(categoryIds: [ID!]!): EventsResponse!
}

# Mutations
type Mutation {
  createEvent(input: EventInput!): MutationResponse
  updateEvent(eventId: ID!,slotName: String,eventUpdates: EventUpdates,slotUpdates: SlotsUpdates,): MutationResponse
  deleteEvent(id: ID!): MutationResponse
  
  # Event Likes
  createEventLike(userId: ID!, eventId: ID!): MutationResponse
  deleteLike(id: ID!): MutationResponse
  deleteEventLike(id: ID!): Boolean!
  
  # Event Bookmarks
  createEventBookmark(userId: ID!, eventId: ID!): MutationResponse
  deleteEventBookmark(id: ID!): MutationResponse
  
  # Event Slots and Tickets
  updateEventSlots(eventId: ID!,slotName: String,slotUpdates: SlotsUpdates): MutationResponse
  bookEventTicket(slotId: ID!,slotName: String!,userId: ID!,ticketType: TicketType!, quantity: Int!,): MutationResponse
  
  # Event Ratings and Notifications
  createEventRating(
    userId: ID!
    eventId: ID!
    scoreRating: Float!
    review: String
  ): MutationResponse!
  updateEventRating(
    id: ID!
    scoreRating: Float
    review: String
  ): MutationResponse!
  deleteEventRating(id: ID!): Boolean!
  
  createEventNotification(
    userId: ID!
    eventId: ID!
    content: String!
    status: NotificationStatus!
    type: NotificationType
  ): EventNotification!
  deleteEventNotification(id: ID!): Boolean!
  
  # Bookings
  deleteEventBooking(id: ID!): Boolean!
  updateNotificationStatus(id: ID!, status: String!): EventNotification!

    # Category Mutations
    createCategory(input: CategoryInput!): CategoryResponse!
    updateCategory(id: ID!, input: CategoryUpdateInput!): CategoryResponse!
    deleteCategory(id: ID!): CategoryResponse!
    
    # Event-Category Relationship Mutations
    addCategoriesToEvent(eventId: ID!, categoryIds: [ID!]!): MutationResponse!
    removeEventCategories(eventId: ID!, categoryIds: [ID!]!): MutationResponse!
}
`;
