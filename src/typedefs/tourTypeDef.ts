import { gql } from 'graphql-tag';

export const tourTypeDefs = gql`
  type Tour {
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
    createdAt: String!
    updatedAt: String!
  }

  type Organizer {
    id: ID!
    name: String!
    email: String!
    phone: String
    description: String
    imageUrl: String
  }

  input CreateTourInput {
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

  input UpdateTourInput {
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
    tours: [Tour!]!
    tour(id: ID!): Tour!
    upcomingTours: [Tour!]!
    toursByCategory(category: String!): [Tour!]!
    toursByOrganizer(organizerId: ID!): [Tour!]!
  }

  extend type Mutation {
    createTour(input: CreateTourInput!): Tour!
    updateTour(id: ID!, input: UpdateTourInput!): Tour!
    deleteTour(id: ID!): Boolean!
  }
`; 