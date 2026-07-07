import { Exclude } from "class-transformer";
import { Report } from "../reports/reports.entity";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() // Exclude password from serialization
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]; // One user can have many reports

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
