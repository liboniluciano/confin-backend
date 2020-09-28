import { MaxLength, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TypesTransactions from "./TypesTransactions";
import Users from "./Users";

@Entity()
export default class UsersTransactions {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(5, { message: 'O nome da transação deve ter no mínimo 5 caracteres'} )
  @MaxLength(30, { message: 'O nome da transação deve ter no máximo 30 caracteres'} )
  @Column()
  name: string;
  
  @Column()
  value: number;

  @ManyToOne(type => Users, usersTransactions => UsersTransactions)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(type => TypesTransactions, usersTransactions => UsersTransactions)
  @JoinColumn({ name: 'typeTransaction_id' })
  typeTransaction: TypesTransactions;

}