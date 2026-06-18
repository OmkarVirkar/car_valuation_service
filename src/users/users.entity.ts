import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @AfterInsert() // Log after user is inserted
  logInsert() {
    console.log(`User with ID ${this.id} has been inserted into the database.`);
  }

  @AfterUpdate() // Log after user is updated
  logUpdate() {
    console.log(`User with ID ${this.id} has been updated in the database.`);
  }

  @AfterRemove() // Log after user is removed
  logRemove() {
    console.log(`User with ID ${this.id} has been removed from the database.`);
  }
}
