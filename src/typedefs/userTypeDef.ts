// userTypeDefs.ts

export const userTypeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String
    age: Int
    email: String!
  }

  input UserInput {
    firstName: String!
    lastName: String
    age: Int
    email: String!
  }

  input UserUpdates {
    firstName: String
    lastName: String
    age: Int
    email: String
  }

  type MutationResponse {
    success: Boolean!
    message: String
    user: User
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): MutationResponse
    updateUser(id: ID!, input: UserUpdates): MutationResponse
    deleteUser(id: ID!): MutationResponse
  }
`;
