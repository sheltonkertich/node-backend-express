// utils/fetchUserAndEvent.ts
import { GraphQLError } from 'graphql';
import { services } from '../services/index';  // Adjust the import paths as needed
import { User } from '../entities/User';
import { Event, EventSlots } from '../entities/Event';

// Define types for the services (optional, but recommended for better type safety)
// The function now returns both user and event, with types
async function validateUserEventSlot(userId: number, eventId: number, slotId: number, slotName: string): Promise<{user:User, event: Event, slot: EventSlots}|null> {
    const user = await services.userService.getUserById(userId)
    const event = await services.eventService.getEventById(eventId);
    const slot = await services.slotsService.getEventSlot(slotId, slotName)

    if (!user) {
        throw new GraphQLError("User not found");
    }
    if (!event) {
        throw new GraphQLError("Event not found");
    }
    if (!slot) {
        throw new GraphQLError("Slot not found");
    }

    return { user, event, slot };
}

export default validateUserEventSlot;
