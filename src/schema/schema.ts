import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "../typedefs/userTypeDef.js";
import { userResolvers } from "../resolvers/userResolver.js";


export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs:userTypeDefs,
  resolvers:userResolvers,
});
