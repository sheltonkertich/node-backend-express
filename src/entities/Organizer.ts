import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export default class Organizer {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: 'varchar', length: 50 })
    userName: string;
  
    @Column({ type: 'varchar', length: 100 })
    displayName: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column({ type: 'varchar', length: 255 })
    contacts: string;
  
    @Column({ type: 'boolean', default: false })
    isEventsCreator: boolean;
  
    @Column({ type: 'boolean', default: false })
    isTourCreator: boolean;
  }

