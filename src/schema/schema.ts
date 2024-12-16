import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "../typedefs/userTypeDef";
import { eventTypeDefs } from "../typedefs/eventTypeDef";
import { tourTypeDefs } from "../typedefs/tourTypeDef";
import { resolvers } from "../resolvers";

// Create base types that will be extended by other type definitions
const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, userTypeDefs, eventTypeDefs, tourTypeDefs],
  resolvers,
});
