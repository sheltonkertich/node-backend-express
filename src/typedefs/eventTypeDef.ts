export const eventTypeDef = `#graphql
# Event Entity
type MutationResponse {
    success: Boolean
    message: String
    singleEvent:Event
    singleEventLike:EventLike
    singleSlot:EventSlots
    singleEventBookmark: EventBookmark
    singleTicket: EventTickets
    singleRating:EventRating
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
    eventBookmarks:[EventBookmark]
    eventBookmark:EventBookmark
    eventSlot:Slot
    allSlots:[Slot]
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
  bookmarks: [EventBookmark]
  ratings: [EventRating]
  categories: [EventCategory]
  notifications: [EventNotification]
  slots: [EventSlots]
}
input EventInput {
  organizer: String!
  time: String! # ISO format for timestamp
  startTime: String!
  endTime: String!
  location: String!
  category: String!
  status: String!
  coverImage: String
  description: String!
  cost: Float!
  slots: [SlotsInput]
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
  slots: [SlotsUpdates]
  # likes: [EventLike]
  # bookings: [EventBooking]
  # bookmarks: [EventBookmark]
  # ratings: [EventRating]
  # notifications: [EventNotification]
}
input SlotsInput {
    startTime: String!
    endTime: String!
    capacity: Int!
    codeName: String
    vvipAvailable: Int
    vipAvailable: Int
    normalAvailable: Int
    vvipPrice:Int
    vipPrice:Int
    normalPrice:Int
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

type EventSlots {
  id: ID!
    startTime: String!
    endTime: String!
    codeName:String!
    capacity: Int!
    vvipAvailable: Int!
    vipAvailable: Int!
    normalAvailable: Int!
    tickets: [EventTickets!]!
}
type Slot {
  id: ID
  event:Event
  codeName:String
  capacity: Int
  vvipAvailable: Int
  vipAvailable: Int
  normalAvailable: Int
  tickets: [EventTickets!]
}
type EventTickets {
  id: ID!
  ticketType: TicketType!
  price: Float!
  quantity: Int!
}
 enum TicketType {
  NORMAL
  VIP
  VVIP
}

# Event Like Entity
type EventLike {
  id: ID!
  event: Event!
  user: User
}

# Event Bookmark Entity
type EventBookmark {
  id: ID!
  user: User!
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
  review: String
}

# Event Notification Entity
type EventNotification {
  id: ID!
  event: Event!
  userId: String!
  content: String!
  status: String!
}

# ---------------------------------------------- Queries -------------------------------------------------------------------------- #
type Query {
    getEvent(id: ID!): EventsResponse
    getEvents: EventsResponse
    getEventLike(id:ID!, userID: ID, eventID: ID):EventsResponse
    getAllLikes: EventsResponse
    getEventBookmark(id:ID!, userID: ID, eventID: ID):EventsResponse
    getAllEventBookmarks: EventsResponse
    getAllslots: EventsResponse
    getEventSlot(id:ID,codeName:String):EventsResponse
    
    getEventBookings: [EventBooking!]!
    getEventCategories: [EventCategory!]!
    getEventRatings: [EventRating!]!
    getEventNotifications: [EventNotification!]!
}

# -------------------------------------------------- mutations ---------------------------------------------------------------------- #
type Mutation {
  #deleteMultipleEvents()
  #deleteMultipleUsers()
  createEvent( input:EventInput! ): MutationResponse
  updateEvent(eventId: ID!,slotName:String, eventUpdates:EventUpdates, slotUpdates:SlotsUpdates): MutationResponse
  deleteEvent(id: ID!): MutationResponse
  deleteLike(id: ID!): MutationResponse
  createEventBookmark(userId: ID!, eventId: ID!): MutationResponse
  deleteEventBookmark(id: ID!): MutationResponse
  updateEventSlots(eventId: ID!,slotName:String,slotUpdates:SlotsUpdates): MutationResponse
  createEventLike(userId: ID!, eventId: ID!):MutationResponse
  bookEventTicket(slotId:ID!,slotName:String!, userId: ID!, ticketType: TicketType!, quantity: Int!):MutationResponse
  createEventRating(userId: ID!, eventId: ID!, scoreRating: Float!,review: String): MutationResponse!

  # --------first section trial
  #createEventBooking(userId: String!, eventId: ID!, slotSet: String!, slotsBooked: Int!): EventBooking!
  
  createEventNotification(userId: String!, eventId: ID!, content: String!, status: String!): EventNotification!

  deleteEventBooking(id: ID!): Boolean!
  deleteEventLike(id: ID!): Boolean!
  deleteEventRating(id: ID!): Boolean!
  deleteEventNotification(id: ID!): Boolean!
}
`;
