import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

/** service typeORM transaction queryRunner */
@Injectable()
export class UsersCreateManyService {
  constructor(private readonly dataSource: DataSource) {}
  /** typeORM transaction queryRunner */
  async createMany(createManyUsersDto: CreateManyUsersDto) {
    // step 1: create Query Runner Instance
    // step 2: connect Query Runner to data source
    // step 3: start transaction
    // step 4: perform operations (save users)
    // step 5: if successful, commit the transaction (save the transaction to the database)
    // step 6: if fails, rollback the transaction (remove  the transaction from the database)
    // step 7: release connection, close Query Runner

    try {
      if (!createManyUsersDto.users || createManyUsersDto.users.length === 0) {
        throw new BadRequestException('No users provided to create');
      }
      const newUsers: User[] = [];
      // --- step 1 ---
      const queryRunner = this.dataSource.createQueryRunner();

      // --- step 2 ---
      await queryRunner.connect();

      // --- step 3 ---
      await queryRunner.startTransaction();

      // --- step 4 ---
      try {
        // for (const user of createManyUsersDto.users) {
        //   const newUser = queryRunner.manager.create(User, user);
        //   const result = await queryRunner.manager.save(newUser);
        //   newUsers.push(result);
        // }
        const usersToSave = createManyUsersDto.users.map((user) =>
          queryRunner.manager.create(User, user),
        );
        const savedUsers = await queryRunner.manager.save(User, usersToSave);
        newUsers.push(...savedUsers);

        // --- step 5 ---
        await queryRunner.commitTransaction();
      } catch (err) {
        console.error('Error during transaction:', err);
        // --- step 6 ---
        await queryRunner.rollbackTransaction();
        throw new ConflictException(
          'Unable to process your request at the moment. Please try later.',
          {
            description: String(err.code),
          },
        );
      } finally {
        // --- step 7 ---
        await queryRunner.release();
      }

      return { users: newUsers };
    } catch (error) {
      console.error('Service error during creating many users:', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: String(error.code),
        },
      );
    }
  }
}
