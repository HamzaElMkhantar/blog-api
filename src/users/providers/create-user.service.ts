import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/providers/hashing.service';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserService {
  /** constructor to Inject authService or other service related to the user */
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @Inject(forwardRef(() => HashingService))
    private readonly hashingService: HashingService,

    private readonly mailService: MailService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepo.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'the user already exists, please check your email',
        );
      }

      const hashedPassword = await this.hashingService.hashPassword(
        createUserDto.password,
      );

      let newUser = this.userRepo.create({
        ...createUserDto,
        password: hashedPassword,
      });
      newUser = await this.userRepo.save(newUser);

      await this.mailService.sendUserWelcome(newUser);
      //   delete newUser.password;
      return newUser;
    } catch (error) {
      // Log the original error for debugging
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: `Error connecting to the database, ERROR: ${error}`,
        },
      );
    }
  }
}
