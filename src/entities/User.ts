import {
Entity,  PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn, Index, OneToMany,DeleteDateColumn, JoinColumn, Relation
} from "typeorm";
import { EventBookings, EventBookmarks, EventLikes, EventNotifications, EventRatings } from "./Event.js";

// User entity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, nullable:false})
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable:true})
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ type: "int", nullable: true })
  age?: number; // Make age optional if it's not always provided

  @Index({ unique: true }) // Ensure email is unique
  @Column({ type: "varchar", length: 100 })
  email: string;

  @OneToMany(() => EventLikes, (eventLike) => eventLike.user, {cascade:true, onDelete: "SET NULL", nullable: true })
  eventLikes: Relation<EventLikes[]>

  @OneToMany(()=> EventBookmarks, (eventBookmark) => eventBookmark.user, {cascade:true, onDelete: "SET NULL", nullable: true })
  bookmarks: Relation<EventBookmarks[]>

  @OneToMany(()=> EventBookings, (eventBooking) => eventBooking.user, { onDelete: "SET NULL", nullable: true })
  bookings: Relation<EventBookings[]>

  @OneToMany(()=> EventRatings, (eventRating) => eventRating.user, { onDelete: "SET NULL", nullable: true })
  ratings: Relation<EventRatings[]>

  @OneToMany(()=>EventNotifications, (eventNotification) => eventNotification.user, { onDelete: "SET NULL", nullable: true }) 
  notifications: Relation<EventNotifications[]>
}
