import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { GoogleUserInterface } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async createGoogleUser(googleUser: GoogleUserInterface) {
    try {
      const user = this.userRepo.create(googleUser);
      return await this.userRepo.save(user);
    } catch (err) {
      throw new ConflictException(err, {
        description: 'Failed to create user',
      });
    }
  }
}
