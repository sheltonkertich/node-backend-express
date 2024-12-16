import { gql } from 'graphql-tag';

export const eventTypeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String!
    category: String!
    location: String!
    startDate: String!
    endDate: String!
    price: Float!
    capacity: Int!
    imageUrl: String
    organizerId: String!
    organizer: Organizer!
    likes: [EventLike!]!
    bookmarks: [EventBookmark!]!
    createdAt: String!
    updatedAt: String!
  }

  type EventLike {
    id: ID!
    userId: String!
    eventId: String!
    createdAt: String!
  }

  type EventBookmark {
    id: ID!
    userId: String!
    eventId: String!
    createdAt: String!
  }

  input CreateEventInput {
    title: String!
    description: String!
    category: String!
    location: String!
    startDate: String!
    endDate: String!
    price: Float!
    capacity: Int!
    imageUrl: String
    organizerId: String!
  }

  input UpdateEventInput {
    title: String
    description: String
    category: String
    location: String
    startDate: String
    endDate: String
    price: Float
    capacity: Int
    imageUrl: String
  }

  extend type Query {
    events: [Event!]!
    event(id: ID!): Event!
    upcomingEvents: [Event!]!
    eventsByCategory(category: String!): [Event!]!
    eventsByOrganizer(organizerId: ID!): [Event!]!
  }

  extend type Mutation {
    createEvent(input: CreateEventInput!): Event!
    updateEvent(id: ID!, input: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Boolean!
    likeEvent(userId: ID!, eventId: ID!): EventLike!
    unlikeEvent(userId: ID!, eventId: ID!): Boolean!
    bookmarkEvent(userId: ID!, eventId: ID!): EventBookmark!
    removeBookmark(userId: ID!, eventId: ID!): Boolean!
  }
`;
