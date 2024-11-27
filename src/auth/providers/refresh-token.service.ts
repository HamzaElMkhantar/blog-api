import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokensService } from './generate-tokens.service';

@Injectable()
export class RefreshTokensService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService)) // inject for a circular dependency
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly generateTokensService: GenerateTokensService,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // verify the refresh token using jwtService
      const token: Partial<ActiveUserData> = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      // fetch the user from the database
      const user = await this.usersService.findOneById(token.sub);
      // generate new access token

      return await this.generateTokensService.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
