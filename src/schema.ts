import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

export const typeDefs = `
    type Query {
        hello: String
    }
`;

export const resolvers = {
    Query: {
        hello: () => 'Hello from GraphQL!'
    }
};

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});