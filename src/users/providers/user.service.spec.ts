import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserService } from './create-google-user.service';
import { FindOneByGoogleIdService } from './find-one-by-google-id.service';
import { FindOneUserByEmailService } from './find-one-user-by-email.service';
import { CreateUserService } from './create-user.service';
import { UsersCreateManyService } from './users-create-many.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('userService', () => {
  const mockConfig = {
    someKey: 'someValue', // Provide a mock configuration object as required
  };

  const mockCreateUserService: Partial<CreateUserService> = {
    createUser: (createUserDto: CreateUserDto) =>
      Promise.resolve({
        id: 12,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
      }),
  };

  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'CONFIGURATION(profileConfig)', useValue: mockConfig },
        { provide: CreateUserService, useValue: mockCreateUserService },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: CreateGoogleUserService, useValue: {} },
        { provide: FindOneByGoogleIdService, useValue: {} },
        { provide: FindOneUserByEmailService, useValue: {} },
        { provide: UsersCreateManyService, useValue: {} },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user method', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call createUser on createUserService', async () => {
      const user = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
      expect(user.firstName).toEqual('John');
    });
  });
});
