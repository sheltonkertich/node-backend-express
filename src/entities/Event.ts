import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index, DeleteDateColumn, Relation, Unique, JoinTable,
  ManyToMany
} from "typeorm";
import { User } from "./User.js";


export enum EventStatus {
  ACTIVE = "active",
  ENDED = "ended",
  CANCELLED = "cancelled",
  DRAFT = "draft"
}

export enum TicketType {
  NORMAL = "normal",
  VIP = "vip",
  VVIP = "vvip"
}
export enum NotificationStatus {
  UNREAD = "unread",
  READ = "read"
}
export enum NotificationType {
  EVENT_REMINDER = "event_reminder",
  BOOKING_CONFIRMATION = "booking_confirmation",
  TICKET_UPDATE = "ticket_update",
  FRIEND_REQUEST = "friend_request",
  SYSTEM_ALERT = "system_alert",
  PROMOTIONAL = "promotional"
}
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  organizer: string;

  @Column({ type: "timestamp", nullable: true })
  time: Date;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ type: "text", nullable: true })
  location: string;

  @Index()
  @Column({ type: "text", nullable: true })
  category: string;

  @Column({
    type: "enum",
    enum: EventStatus,
    default: EventStatus.ACTIVE
  })
  status: EventStatus;

  @Column()
  coverImage: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  cost: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => EventLikes, (eventLike) => eventLike.event, { cascade: true, onDelete: "CASCADE", nullable: true })
  eventLikes: EventLikes[]

  @OneToMany(() => EventBookmarks, (bookmarks) => bookmarks.event, { cascade: true, onDelete: "CASCADE", nullable: true })
  bookmarks: EventBookmarks[];

  @OneToMany(() => EventSlots, (slot) => slot.event, { cascade: true, onDelete: "CASCADE" })
  slots: EventSlots[];

  @ManyToMany(() => EventCategories)
  @JoinTable()
  categories: EventCategories[];

  @OneToMany(() => EventRatings, (ratings) => ratings.event)
  ratings: EventRatings[];

  @OneToMany(() => EventNotifications, (notifications) => notifications.event)
  notifications: EventNotifications[];

  // Optional: Helper method to check if event is available
  isAvailable(): boolean {
    return this.status === EventStatus.ACTIVE;
  }

  // Optional: Helper method to automatically update status based on dates
  updateStatus(): void {
    const now = new Date();
    if (this.endTime && now > this.endTime) {
      this.status = EventStatus.ENDED;
    } else if (this.startTime && now >= this.startTime) {
      this.status = EventStatus.ACTIVE;
    } else {
      this.status = EventStatus.ACTIVE;
    }
  }
}
// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event", "user"])
export class EventLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Event, (event) => event.eventLikes, { onDelete: "CASCADE" })
  event: Relation<Event>;

  @ManyToOne(() => User, (user) => user.eventLikes, { nullable: true })
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

  @ManyToOne(() => Event, (event) => event.bookmarks, { onDelete: "CASCADE" })
  event: Event;

  @ManyToOne(() => User, (user) => user.bookmarks, { nullable: true })
  user: Relation<User>
}
// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["user"])
export class EventBookings {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  bookedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: Relation<User>

  // @ManyToOne(() => EventSlots,slot => slot.bookings,{ onDelete: "SET NULL" })
  // slot: EventSlots;

  // @ManyToOne(() => EventTickets=>(ticket)=>ticket.bookings, { onDelete: "SET NULL" })
  // ticket: EventTickets;

  @Column({
    type: "enum",
    enum: TicketType,
  })
  ticketType: TicketType;

  @Column()
  status: string;

  @Column()
  slotSet: string;

  @Column()
  slotsBooked: number; // Assuming this is a numeric value
}
// -----------------------------------------------------------------------------------------------------------------//
@Entity()
export class EventSlots {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.slots, { onDelete: "CASCADE" })
  event: Event;

  @Column({ nullable: true })
  codeName: string

  @Column()
  capacity: number;

  @Column({ default: 0 })
  vvipAvailable: number; // VVIP tickets available

  @Column({ default: 0 })
  vipAvailable: number; // VIP tickets available

  @Column({ default: 0 })
  normalAvailable: number; // Normal tickets available

  // New columns for pricing
  @Column("decimal", { precision: 10, scale: 2, nullable: true },)
  vvipPrice: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  vipPrice: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  normalPrice: number;

  @OneToMany(() => EventTickets, ticket => ticket.slot, { cascade: true, onDelete: "CASCADE" })
  tickets: EventTickets[];
}

// -----------------------------------------------------------------------------------------------------------------//
@Entity()
//@Unique(["user"])
export class EventTickets {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => EventSlots, slot => slot.tickets)
  slot: Relation<EventSlots>;

  @ManyToOne(() => User, (user) => user.tickets)
  user: Relation<User>

  @Column({
    type: "enum",
    enum: TicketType,
  })
  ticketType: TicketType;

  @Column({ nullable: true })
  slotName: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

}


// -----------------------------------------------------------------------------------------------------------------//
@Entity()
export class EventCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  categoryName: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Event,{nullable:true})
  event: Event[];
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

  @Column({ type: "text", nullable: true })
  review: string;  // Optional review comment
}


// -----------------------------------------------------------------------------------------------------------------//
@Entity()
@Unique(["event", "user"])
export class EventNotifications {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date; // Fixed typo (creaedAt to createdAt)
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Event, (event) => event.notifications)
  event: Event;

  @ManyToOne(() => User, (user) => user.notifications)
  user: Relation<User>
  
  @Column({ type: "text" })
  content: string;

  @Column({
    type: "enum",
    enum: NotificationType
  })
  type: NotificationType;

  @Column({
    type: "enum",
    enum: NotificationStatus,
  })
  status: NotificationStatus

 
}

