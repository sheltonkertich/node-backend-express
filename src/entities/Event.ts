import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index, JoinColumn, DeleteDateColumn, Relation, Unique
} from "typeorm";
import { User } from "./User.js";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  organizer: string;

  @Column({ type: "timestamp", nullable: true })
  time: Date;

  @Column({ type: "text", nullable: true })
  location: string;

  @Index()
  @Column({ type: "text", nullable: true })
  category: string;

  @Column({ type: "text", nullable: true })
  status: string;

  @Column()
  coverImage: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  cost: number;

  @Column({ type: "numeric", nullable: true })
  seatAvailable: number; // Assuming this is a numeric value

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;


  @OneToMany(() => EventLikes, (eventLike) => eventLike.event, { onDelete: "SET NULL", nullable: true })
  eventLikes: EventLikes[]

  @OneToMany(() => EventBookmarks, (bookmarks) => bookmarks.event,{ onDelete: "SET NULL", nullable: true })
  bookmarks: EventBookmarks[];

  @OneToMany(() => EventBookings, (bookings) => bookings.event)
  bookings: EventBookings[]

  @OneToMany(() => EventCategories, (categories) => categories.event)
  categories: EventCategories[];

  @OneToMany(() => EventRatings, (ratings) => ratings.event)
  ratings: EventRatings[];

  @OneToMany(() => EventNotifications, (notifications) => notifications.event)
  notifications: EventNotifications[];

}
// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event", "user"])
export class EventLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Event, (event) => event.eventLikes)
  event: Relation<Event>;

  @ManyToOne(() => User, (user) => user.eventLikes)
  user: Relation<User>;
}

// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event", "user"])
export class EventBookmarks {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date; // Consistent naming (userId instead of userID)

  @ManyToOne(() => Event, (event) => event.bookmarks)
  event: Event;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: Relation<User>
}

// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event", "user"])
export class EventBookings {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  bookedDate: Date;

  @ManyToOne(() => Event, (event) => event.bookings)
  event: Event;

  @ManyToOne(() => User, (user) => user.bookings)
  user: Relation<User>

  @Column()
  slotSet: string;

  @Column()
  slotsBooked: number; // Assuming this is a numeric value
}

// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event"])
export class EventCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @CreateDateColumn()
  createdAt: Date; // Fixed typo (creaedAt to createdAt)

  @ManyToOne(() => Event, (event) => event.categories)
  event: Event;
}

// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event", "user"])
export class EventRatings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.ratings)
  event: Event;

  @CreateDateColumn()
  createdAt: Date; // Fixed typo (creaedAt to createdAt)

  @ManyToOne(() => User, (user) => user.ratings)
  user: Relation<User>

  @Column({ type: "decimal", precision: 2, scale: 1 })
  scoreRating: number; // Assuming a rating system from 1.0 to 5.0
}


// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event", "user"])
export class EventNotifications {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date; // Fixed typo (creaedAt to createdAt)

  @ManyToOne(() => Event, (event) => event.notifications)
  event: Event;

  @ManyToOne(() => User, (user) => user.notifications)
  user: Relation<User>

  @Column({ type: "text" })
  content: string;

  @Column()
  status: string;
}

