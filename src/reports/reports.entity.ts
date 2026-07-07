import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../users/users.entity";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;
  
  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @ManyToOne(() => User, (user) => user.reports, { 
    eager: true // Load the user relation whenever a report is fetched 
  })
  user: User;
}
