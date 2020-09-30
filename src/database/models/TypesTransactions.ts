import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UsersTransactions from './UsersTransactions';

@Entity()
export default class TypesTransactions {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(5, {
    message: 'O tipo de transação precisa ter no mínimo 5 caracteres',
  })
  @MaxLength(25, {
    message: 'O tipo de transação pode ter no máximo 25 caracteres',
  })
  @Column()
  name: string;

  @OneToMany(
    (type) => UsersTransactions,
    (typeTransaction) => TypesTransactions
  )
  usersTransactions: UsersTransactions[];
}
