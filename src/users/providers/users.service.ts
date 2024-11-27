import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyService } from './users-create-many.service';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserService } from './create-user.service';
import { FindOneUserByEmailService } from './find-one-user-by-email.service';
import { FindOneByGoogleIdService } from './find-one-by-google-id.service';
import { CreateGoogleUserService } from './create-google-user.service';
import { GoogleUserInterface } from '../interfaces/google-user.interface';
// import { ConfigService } from '@nestjs/config';

/** Class to connect to Users table and perform business operations  */
@Injectable()
export class UsersService {
  /** constructor to Inject authService or other service related to the user */
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    // private readonly configService: ConfigService, // ? global configuration
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    /** Inject data source */
    private readonly dataSource: DataSource,
    private readonly usersCreateManyService: UsersCreateManyService,
    private readonly createUserService: CreateUserService,
    private readonly findOneUserByEmailService: FindOneUserByEmailService,
    private readonly findOneByGoogleIdService: FindOneByGoogleIdService,
    private readonly createGoogleUserService: CreateGoogleUserService,
  ) {}

  /** find all user */
  findAll(getUsersParamDto: GetUsersParamDto) {
    // throw new NotFoundException('Not found');
    // throw new HttpException(
    //   {
    //     status: HttpStatus.MOVED_PERMANENTLY,
    //     message: 'the Api endpoint does not exist',
    //     error: `error: `,
    //   },
    //   HttpStatus.MOVED_PERMANENTLY,
    //   {
    //     //? this object will not sent back to the user its just for own use !
    //     description:
    //       'Occurred because the API endpoint was permanently unavailable',
    //     cause: new Error(),
    //   },
    // );

    let user = undefined;
    try {
      user = this.userRepo.find({ where: { id: getUsersParamDto.id } });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: `error: ${error}`,
        },
        HttpStatus.NOT_FOUND,
        {
          //? this object will not sent back to the user its just for own use !
          description:
            'Occurred because the API endpoint was permanently unavailable',
          cause: new Error(),
        },
      );
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // const environments = this.profileConfiguration;
    // console.log(environments);
    delete user.password;
    return user;
  }

  /** find one user by id */
  async findOneById(userId: number) {
    let user = undefined;
    try {
      user = await this.userRepo.findOne({ where: { id: +userId } });
    } catch (error) {
      // Log the original error for debugging
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: `Error connecting to the database, ERROR: ${error}`,
        },
      );
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    return this.createUserService.createUser(createUserDto);
  }

  // /** typeORM transaction queryRunner */
  // async createMany(createUsersDto: CreateUserDto[]) {
  //   // step 1: create Query Runner Instance
  //   // step 2: connect Query Runner to data source
  //   // step 3: start transaction
  //   // step 4: perform operations (save users)
  //   // step 5: if successful, commit the transaction (save the transaction to the database)
  //   // step 6: if fails, rollback the transaction (remove  the transaction from the database)
  //   // step 7: release connection, close Query Runner

  //   const newUsers: User[] = [];
  //   // --- step 1 ---
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   // --- step 2 ---
  //   await queryRunner.connect();

  //   // --- step 3 ---
  //   await queryRunner.startTransaction();

  //   // --- step 4 ---
  //   try {
  //     for (const user of createUsersDto) {
  //       const newUser = queryRunner.manager.create(User, user);
  //       const result = await queryRunner.manager.save(newUser);
  //       newUsers.push(result);
  //     }

  //     // --- step 5 ---
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     console.error('Error during transaction:', err);
  //     // --- step 6 ---
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // --- step 7 ---
  //     await queryRunner.release();
  //   }
  // }

  /** typeORM transaction queryRunner */
  async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return this.usersCreateManyService.createMany(createManyUsersDto);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOneUserByEmailService.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return this.findOneByGoogleIdService.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUserInterface) {
    return await this.createGoogleUserService.createGoogleUser(googleUser);
  }
}
