export const userTypeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String
    age:Int
    email: String
  }
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
  type Mutation {
    createUser(firstName: String!, lastName:String,age:Int, email: String!): User
    updateUser(id:ID!,firstName: String, lastName:String,age:Int, email: String):User
  }
  `;
