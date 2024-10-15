import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "./entities/User.js";
import Organizer from "./entities/Organizer.js";
import {
  Event,
  EventBookings,
  EventBookmarks,
  EventCategories,
  EventLikes,
  EventNotifications,
  EventRatings,
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
    Organizer,
    Event,
    EventBookings,
    EventBookmarks,
    EventCategories,
    EventLikes,
    EventNotifications,
    EventRatings,

  ],
  subscribers: [],
  migrations: ["src/migrations/**/*.{js,ts}"],
});
