import { Event } from '../../entities/Event';
import { EventStatus } from '../../types/eventTypes';

export const createMockEvent = (overrides = {}): Event => {
  const event = new Event();
  Object.assign(event, {
    id: 1,
    organizer: 'Test Org',
    time: new Date(),
    location: 'Test Location',
    status: EventStatus.ACTIVE,
    coverImage: 'test.jpg',
    description: 'Test Description',
    cost: 100,
    seatAvailable: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
    eventLikes: [],
    bookmarks: [],
    ratings: [],
    notifications: [],
    slots: [],
    categories: []
  }, overrides);
  return event;
};

export const createMockEventInput = (overrides = {}) => ({
  organizer: 'Test Org',
  time: new Date(),
  location: 'Test Location',
  status: EventStatus.ACTIVE,
  coverImage: 'test.jpg',
  description: 'Test Description',
  cost: 100,
  seatAvailable: 50,
  categories: [],
  ...overrides
}); 