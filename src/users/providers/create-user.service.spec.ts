import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingService } from 'src/auth/providers/hashing.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { RequestTimeoutException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});
describe('CreateUserService', () => {
  let provider: CreateUserService;
  let usersRepository: MockRepository;
  const user = {
    firstName: 'john',
    lastName: 'doe',
    email: 'john.doe@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>(),
        },
        {
          provide: MailService,
          useValue: { sendUserWelcome: jest.fn(() => Promise.resolve()) },
        },
        {
          provide: HashingService,
          useValue: { hashPassword: jest.fn(() => user.password) },
        },
      ],
    }).compile();

    provider = module.get<CreateUserService>(CreateUserService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('service should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('usersRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      usersRepository.findOne.mockReturnValue(null);
      usersRepository.create.mockReturnValue(user);
      usersRepository.save.mockReturnValue(user);

      await provider.createUser(user);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
      expect(usersRepository.create).toHaveBeenCalledWith(user);
      expect(usersRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('when user exist', () => {
    it('throw bad request', async () => {
      usersRepository.findOne.mockReturnValue(user.email);
      usersRepository.create.mockReturnValue(user);
      usersRepository.save.mockReturnValue(user);

      try {
        await provider.createUser(user);
      } catch (error) {
        expect(error).toBeInstanceOf(RequestTimeoutException);
        // expect(error.message).toBe(
        //   'the user already exists, please check your email',
        // ); // Verify the error message
      }
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
    });
  });
});
