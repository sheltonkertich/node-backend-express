import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

export const typeDefs = `
    type Query {
        hello: String
    }
`;

export const resolvers = {
    Query: {
        hello: () => 'Hello from GraphQL! and its working okay'
    }
};

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});