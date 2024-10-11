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

    @Column('varchar', { length: 50, select: false })
    userName: string;

    @Column('varchar', { length: 100, select: false })
    displayName: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @Column('varchar', { length: 255, select: false })
    contacts: string;

    @Column('boolean', { default: false, select: false })
    isEventsCreator: boolean;

    @Column('boolean', { default: false, select: false })
    isTourCreator: boolean;
  }


