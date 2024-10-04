import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "../typedefs/userTypeDef.js";
import { userResolvers } from "../resolvers/userResolver.js";
import { eventTypeDef } from "../typedefs/eventTypeDef.js";
import { eventResolvers } from "../resolvers/eventResolver.js";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [userTypeDefs, eventTypeDef],
  resolvers: [userResolvers,eventResolvers],
});
