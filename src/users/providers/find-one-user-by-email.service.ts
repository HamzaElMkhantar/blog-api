import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: 'Error occurred while finding user by email',
      });
    }
  }
}
