import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizer: string;

  // @Column({ type: "timestamp" })
  // time: Date;

  @Column()
  location: string;

  @Index()
  @Column()
  category: string;

  @Column()
  status: string;

  @Column()
  coverImage: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  cost: number;

  @Column()
  seatAvailable: number; // Assuming this is a numeric value

  @CreateDateColumn({ type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => EventLikes, (eventLike) => eventLike.event)
  @JoinColumn()
  likes: EventLikes[];

  @OneToMany(() => EventBookings, (bookings) => bookings.event)
  @JoinColumn()
  bookings: EventBookings[];

  @OneToMany(() => EventBookmarks, (bookmarks) => bookmarks.event)
  @JoinColumn()
  bookmarks: EventBookmarks[];

  @OneToMany(() => EventRatings, (ratings) => ratings.event)
  @JoinColumn()
  ratings: EventRatings[];

  @OneToMany(() => EventNotifications, (notifications) => notifications.event)
  @JoinColumn()
  notifications: EventNotifications[];

  @OneToMany(() => EventCategories, (categories) => categories.event)
  @JoinColumn()
  categories: EventCategories[];
}

@Entity()
export class EventBookmarks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string; // Consistent naming (userId instead of userID)

  @ManyToOne(() => Event, (event) => event.bookmarks)
  event: Event;
}

@Entity()
export class EventBookings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.bookings)
  event: Event;

  @Column()
  userId: string;

  @CreateDateColumn({ type: "timestamp" })
  bookedDate: Date;

  @Column()
  slotSet: string;

  @Column()
  slotsBooked: number; // Assuming this is a numeric value
}

@Entity()
export class EventLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.likes)
  event: Event;

  @Column()
  userId: string;
}

@Entity()
export class EventCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @CreateDateColumn()
  createdAt: Date; // Fixed typo (creaedAt to createdAt)

  @ManyToOne((type) => Event, (event) => event.category) event: Event;
}

@Entity()
export class EventRatings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.ratings)
  event: Event;

  @Column()
  userId: string;

  @Column({ type: "decimal", precision: 2, scale: 1 })
  scoreRating: number; // Assuming a rating system from 1.0 to 5.0
}

@Entity()
export class EventNotifications {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.notifications)
  event: Event;

  @Column()
  userId: string;

  @Column({ type: "text" })
  content: string;

  @Column()
  status: string;
}
