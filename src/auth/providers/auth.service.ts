import { Injectable } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignInDto } from '../dtos/signin.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInService: SignInService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  async signIn(signInDto: SignInDto) {
    return await this.signInService.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensService.refreshTokens(refreshTokenDto);
  }
}
