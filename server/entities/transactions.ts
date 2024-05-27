import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./client";

export enum TransactionTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transaction")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    type: "enum",
    enum: TransactionTypes,
  })
  type: string;

  @Column({
    type: "numeric",
  })
  amount: number;

  @Column()
  client: string;
}
