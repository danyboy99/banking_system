// Banker entity definition for database table
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client";

// Banker table entity
@Entity("Banker")
export class Banker extends BaseEntity {
  // Primary key with UUID
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Banker's first name
  @Column()
  first_name: string;

  // Banker's last name
  @Column()
  last_name: string;

  // Unique email address
  @Column({
    unique: true,
  })
  email: string;

  // Unique 10-digit card number
  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  // Hashed password
  @Column()
  password: string;

  // Employee identification number
  @Column()
  employees_number: string;
}
