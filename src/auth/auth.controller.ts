import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  // SetMetadata,
  // UseGuards,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/signin.dto';
// import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  // @SetMetadata('isPublic', 'None')
  @Auth(AuthType.None)
  // @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  login(@Body() signInDto: SignInDto): any {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
