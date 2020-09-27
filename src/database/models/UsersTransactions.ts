import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TypesTransactions from "./TypesTransactions";
import Users from "./Users";

@Entity()
export default class UsersTransactions {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  value: number;

  @ManyToOne(type => Users, usersTransactions => UsersTransactions, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(type => TypesTransactions, usersTransactions => UsersTransactions, { eager: true })
  @JoinColumn({ name: 'typeTransaction_id' })
  typeTransaction: TypesTransactions;

}