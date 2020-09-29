import { EntityRepository, Repository } from "typeorm";
import Users from "../../../database/models/Users";

interface UsersDTO {
  id: number;
  name: string;
  mail: string;
}

@EntityRepository(Users)
export default class UserRepository extends Repository<Users> {
  public async createUser(user: UsersDTO): Promise<Users> {
    return await this.save(user);
  }
  
  public async findMail(mail: string): Promise<Users | undefined> {
    const userMail = this.findOne({ where: { mail }});

    if(!userMail) {
      return undefined;
    }
    return userMail;
  }

}