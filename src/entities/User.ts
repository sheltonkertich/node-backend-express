import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  JoinColumn,
  Relation
} from "typeorm";
import { EventLikes } from "./Event.js";

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

  @Column({ type: "int", nullable: true })
  age?: number; // Make age optional if it's not always provided

  @Index({ unique: true }) // Ensure email is unique
  @Column({ type: "varchar", length: 100 })
  email: string;

  @OneToMany(()=>EventLikes,(eventLikes)=>eventLikes.userId,{onDelete:"SET NULL", nullable:true})
  @JoinColumn()
  eventLikes:Relation<EventLikes[]>
}
