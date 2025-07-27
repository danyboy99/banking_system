// Transaction entity definition for database table
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./client";

// Enum for transaction types
export enum TransactionTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

// Transaction table entity
@Entity("transaction")
export class Transaction extends BaseEntity {
  // Primary key with UUID
  @PrimaryGeneratedColumn("uuid")
  id: number;

  // Transaction type (deposit/withdraw)
  @Column({
    type: "enum",
    enum: TransactionTypes,
  })
  type: string;

  // Transaction amount
  @Column({
    type: "numeric",
  })
  amount: number;

  // Client identifier
  @Column()
  client: string;
}
