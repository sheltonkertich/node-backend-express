import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, UserProfile } from "./entities/User.js";
import Organizer from "./entities/Organizer.js";
import {
  Event,
  EventBookings,
  EventBookmarks,
  EventCategories,
  EventLikes,
  EventNotifications,
  EventRatings,
  EventSlots,
  EventTickets
} from "./entities/Event.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin123",
  database: "postgres",
  synchronize: true,
  //logging: true,
  entities: [
    User,
    UserProfile,
    Organizer,
    Event,
    EventLikes,
    EventBookmarks,
    EventSlots,
    EventTickets,
    EventBookings,
    EventCategories,
    EventNotifications,
    EventRatings,

  ],
  subscribers: [],
  migrations: ["src/migrations/**/*.{js,ts}"],
});
