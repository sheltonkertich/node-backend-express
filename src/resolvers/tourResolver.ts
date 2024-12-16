import { services } from '../services';
import { GraphQLError } from 'graphql';

export const tourResolver = {
  Query: {
    tours: async () => {
      return await services.tourService.getAllTours();
    },
    tour: async (_: any, { id }: { id: string }) => {
      const tour = await services.tourService.getTourById(id);
      if (!tour) {
        throw new GraphQLError('Tour not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return tour;
    },
    upcomingTours: async () => {
      return await services.tourService.getUpcomingTours();
    },
    toursByCategory: async (_: any, { category }: { category: string }) => {
      return await services.tourService.getToursByCategory(category);
    },
    toursByOrganizer: async (_: any, { organizerId }: { organizerId: string }) => {
      return await services.tourService.getToursByOrganizer(organizerId);
    }
  },

  Mutation: {
    createTour: async (_: any, { input }: any) => {
      return await services.tourService.createTour(input);
    },
    updateTour: async (_: any, { id, input }: any) => {
      return await services.tourService.updateTour(id, input);
    },
    deleteTour: async (_: any, { id }: { id: string }) => {
      return await services.tourService.deleteTour(id);
    }
  },

  Tour: {
    organizer: async (parent: any) => {
      return await services.organizerService.getOrganizerById(parent.organizerId);
    }
  }
}; 