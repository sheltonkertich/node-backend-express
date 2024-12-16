import { eventResolver } from './eventResolver';
import { userResolver } from './userResolver';
import { tourResolver } from './tourResolver';

export const resolvers = {
  Query: {
    ...eventResolver.Query,
    ...userResolver.Query,
    ...tourResolver.Query,
  },
  Mutation: {
    ...eventResolver.Mutation,
    ...userResolver.Mutation,
    ...tourResolver.Mutation,
  },
  Event: eventResolver.Event,
  User: userResolver.User,
  Tour: tourResolver.Tour,
}; 