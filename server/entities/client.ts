// Client entity definition for database table
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Transaction } from "./transactions";
import { Banker } from "./banker";

// Client table entity
@Entity("Client")
export class Client extends BaseEntity {
  // Primary key with UUID
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Client's first name
  @Column()
  first_name: string;

  // Client's last name
  @Column()
  last_name: string;

  // Unique email address
  @Column({
    unique: true,
  })
  email: string;

  // Hashed password
  @Column()
  password: string;

  // Unique 10-digit card number
  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  // Account balance
  @Column({
    type: "numeric",
  })
  balance: number;

  // Account status (active/inactive)
  @Column({
    default: true,
  })
  is_active: boolean;

  // Additional client information
  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    next_of_skin: string;
    passport_photo: string;
  };

  // Assigned account manager
  @Column()
  account_manager: string;

  // Record creation timestamp
  @CreateDateColumn()
  create_at: Date;

  // Record update timestamp
  @UpdateDateColumn()
  updated_at: Date;
}
