// userTypeDefs.ts

import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    imageUrl: String
    likedEvents: [Event!]!
    bookmarkedEvents: [Event!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    imageUrl: String
  }

  input UpdateUserInput {
    name: String
    email: String
    imageUrl: String
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User!
    userByEmail(email: String!): User!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;
