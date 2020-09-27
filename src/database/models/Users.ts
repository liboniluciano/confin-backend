import { IsEmail, Length, MaxLength, MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcryptjs";
import UsersTransactions from "./UsersTransactions";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(3, { message: 'O nome deve possuir no mínimo 5 caracteres' })
  @MaxLength(40, { message: 'O nome deve possuir no máximo 30 caracteres' })
  @Column()
  name: string;

  @IsEmail({}, { message: 'Você deve inserir um e-mail válido'})
  @Column()
  mail: string;

  @Length(6, 6, { message: 'A senha deve possuir 6 caracteres' })
  @Column()
  password: string;

  @OneToMany(type => UsersTransactions, user => Users)
  usersTransactions: UsersTransactions[];

  @BeforeInsert()
  @BeforeUpdate()
  async createHashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}