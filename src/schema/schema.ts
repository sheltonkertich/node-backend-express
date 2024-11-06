import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "../typedefs/userTypeDef.js";
import { userResolvers } from "../resolvers/userResolver.js";
import { eventTypeDef } from "../typedefs/eventTypeDef.js";
import { createEventResolvers } from "../resolvers/createEventResolvers.js";
import { updateEventResolvers } from "../resolvers/updateEventResolvers.js";
import { queryEventResolvers } from "../resolvers/queryEventResolvers.js";


export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [userTypeDefs, eventTypeDef],
  resolvers: [userResolvers,createEventResolvers, updateEventResolvers, queryEventResolvers],
  
});
