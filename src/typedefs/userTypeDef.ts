// userTypeDefs.ts

export const userTypeDefs = `#graphql
type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    profile: UserProfile
  }

input UserInput {
    firstName: String!
    lastName: String
    email: String!
  }
  input UserProfileInput {
    username: String!
    bio: String
    profile_picture: String
    phone_number: String
    location: String
    interests: [String]
    age: Int
  }

input UserUpdates {
    firstName: String
    lastName: String
    age: Int
    email: String
    profile: UserProfileInput
  }
type UserProfile {  
  id: ID,
    username: String!
    bio: String
    profile_picture: String
    phone_number: String
    location: String
    interests: [String]
    age: Int
}
type MutationResponse {
    success: Boolean
    message: String
    singleUser: User
  }
#-----------------------------------------------------------------------------------------------#
type UserQueryResponse{
    success: Boolean
    message: String
    users:[User]
    user:User
    userEventLikes:[EventLike]
    userEventLike:EventLike
    tickets:[EventTickets]
    UserEventBookmarks:[EventBookmark]
    UserEventBookmark:EventBookmark
    UserEventRatings:[EventRating]
    UserEventRating:EventRating
    UserErrorCode: String
    UserErrorDetail: String
  }

type EventLike {
  id: ID!
  event: Event!
  user: User!
}
type EventBookmark {
  id: ID!
  user: User!
  event: Event!
}
type EventRating {
  id: ID!
  event: Event!
  userId: String!
  scoreRating: Float! # Range from 1.0 to 5.0
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
#-----------------------------------------------------------------------------------------------#
type Query {
    getUsers:UserQueryResponse
    getUser(id: ID!): UserQueryResponse
  }
#-----------------------------------------------------------------------------------------------#
  type Mutation {
    createUser(input: UserInput!): MutationResponse
    updateUser(id: ID!, userUpdates: UserUpdates): MutationResponse
    deleteUser(id: ID!): MutationResponse
  }
`;
