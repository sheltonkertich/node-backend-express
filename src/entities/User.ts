import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

// User entity
@Entity()
export default class User {
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
}
