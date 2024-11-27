import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingService } from './hashing.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { GenerateTokensService } from './generate-tokens.service';

@Injectable()
export class SignInService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // inject for a circular ...
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,

    /** Inject jwt service */
    private readonly jwtService: JwtService,
    /** Inject jwt configuration */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensService: GenerateTokensService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingService.comparePassword(
        password,
        user.password,
      );

      if (!isEqual) {
        throw new UnauthorizedException('Invalid password');
      }

      const { accessToken, refreshToken } =
        await this.generateTokensService.generateTokens(user);

      return {
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email },
      };
    } catch (err) {
      throw new RequestTimeoutException(
        err,
        'Error occurred while comparing password :' + err.message,
      );
    }
  }
}
