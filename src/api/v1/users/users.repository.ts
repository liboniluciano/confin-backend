import { EntityRepository, Repository } from 'typeorm';
import Users from '../../../database/models/Users';

@EntityRepository(Users)
export default class UserRepository extends Repository<Users> {
  public async createUser(user: Users[]): Promise<Users[]> {
    return await this.save(user);
  }

  public async findMail(mail: string): Promise<Users | undefined> {
    const userMail = await this.findOne({ where: { mail } });

    if (!userMail) {
      return undefined;
    }
    return userMail;
  }
}
