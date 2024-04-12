import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
 
  @Column({unique:true})
  email: string

  @Column()
  password:string

  @Column({ default: true })
  isActive: boolean;
}