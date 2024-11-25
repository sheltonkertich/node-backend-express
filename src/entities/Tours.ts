import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    
  } from "typeorm";
  
  @Entity()
  export class Tour {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    organizer: string;

    @CreateDateColumn()
    postedTime: Date;

    @Column()
    title: string;
  
    @Column()
    location: string;

    @Column({ type: "datetime" })
    tourDate: Date;
  
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
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @OneToMany(() => TourLikes, (tourLikes) => tourLikes.tour)
    likes: TourLikes[];
  
    @OneToMany(() => TourBookings, (bookings) => bookings.tour)
    bookings: TourBookings[];
  
    @OneToMany(() => TourBookmarks, (bookmarks) => bookmarks.tour)
    bookmarks: TourBookmarks[];
  
    @OneToMany(() => TourRatings, (ratings) => ratings.tour)
    ratings: TourRatings[];
  
    @OneToMany(() => TourNotifications, (notifications) => notifications.tour)
    notifications: TourNotifications[];
  }
  
  @Entity()
  export class TourBookmarks {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userId: string; // Consistent naming (userId instead of userID)
  
    @ManyToOne(() => Tour, (tour) => tour.bookmarks)
    tour: Tour;
  }
  
  @Entity()
  export class TourBookings {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Tour, (tour) => tour.bookings)
    tour: Tour;
  
    @Column()
    userId: string;
  
    @CreateDateColumn()
    bookedDate: Date;
  
    @Column()
    slotSet: string;
  
    @Column()
    slotsBooked: number; // Assuming this is a numeric value
  }
  
  @Entity()
  export class TourLikes {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Tour, (tour) => tour.likes)
    tour: Tour;
  
    @Column()
    userId: string;
  }
  
  @Entity()
  export class TourCategories {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    categoryName: string;
  
    @CreateDateColumn()
    createdAt: Date; // Fixed typo (creaedAt to createdAt)
  }
  
  @Entity()
  export class TourRatings {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Tour, (tour) => tour.ratings)
    tour: Tour;
  
    @Column()
    userId: string;
  
    @Column({ type: "decimal", precision: 2, scale: 1 })
    scoreRating: number; // Assuming a rating system from 1.0 to 5.0
  }
  
  @Entity()
  export class TourNotifications {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Tour, (tour) => tour.notifications)
    tour: Tour;
  
    @Column()
    userId: string;
  
    @Column({ type: "text" })
    content: string;
  
    @Column()
    status: string;
  }
  