import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client";

@Entity("Banker")
export class Banker extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  @Column()
  password: string;

  @Column()
  employees_number: string;
}
