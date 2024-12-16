import { services } from '../services';
import { GraphQLError } from 'graphql';

export const userResolver = {
  Query: {
    users: async () => {
      return await services.userService.getAllUsers();
    },
    user: async (_: any, { id }: { id: string }) => {
      const user = await services.userService.getUserById(id);
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return user;
    },
    userByEmail: async (_: any, { email }: { email: string }) => {
      const user = await services.userService.getUserByEmail(email);
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return user;
    }
  },

  Mutation: {
    createUser: async (_: any, { input }: any) => {
      return await services.userService.createUser(input);
    },
    updateUser: async (_: any, { id, input }: any) => {
      return await services.userService.updateUser(id, input);
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      return await services.userService.deleteUser(id);
    }
  },

  User: {
    likedEvents: async (parent: any) => {
      const likes = await services.eventLikeService.getUserLikes(parent.$id);
      return Promise.all(
        likes.map(like => services.eventService.getEventById(like.eventId))
      );
    },
    bookmarkedEvents: async (parent: any) => {
      const bookmarks = await services.eventBookmarkService.getUserBookmarks(parent.$id);
      return Promise.all(
        bookmarks.map(bookmark => services.eventService.getEventById(bookmark.eventId))
      );
    }
  }
};
