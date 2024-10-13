import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import User from "./User";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizer: string;

  @Column({ type: "timestamp", nullable: true })
  time: Date;

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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => EventLikes, (eventLike) => eventLike.event, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  likes: EventLikes[];

  @OneToMany(() => EventBookings, (bookings) => bookings.event, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  bookings: EventBookings[];

  @OneToMany(() => EventBookmarks, (bookmarks) => bookmarks.event, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  bookmarks: EventBookmarks[];

  @OneToMany(() => EventRatings, (ratings) => ratings.event, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  ratings: EventRatings[];

  @OneToMany(() => EventNotifications, (notifications) => notifications.event, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  notifications: EventNotifications[];

  @OneToMany(() => EventCategories, (categories) => categories.event, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  categories: EventCategories[];
}

@Entity()
export class EventLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @ManyToOne(() => Event, (event) => event.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  event: Event;

  @ManyToOne(() => User, (user) => user.eventLikes, { onDelete: "CASCADE" })
  userId: User;
}

@Entity()
export class EventBookmarks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string; // Consistent naming (userId instead of userID)

  @ManyToOne(() => Event, (event) => event.bookmarks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  event: Event;
}

@Entity()
export class EventBookings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.bookings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
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
export class EventCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @CreateDateColumn()
  createdAt: Date; // Fixed typo (creaedAt to createdAt)

  @ManyToOne((type) => Event, (event) => event.category, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  event: Event;
}

@Entity()
export class EventRatings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.ratings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
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

  @ManyToOne(() => Event, (event) => event.notifications, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  event: Event;

  @Column()
  userId: string;

  @Column({ type: "text" })
  content: string;

  @Column()
  status: string;
}

