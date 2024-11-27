import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constant';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log(this.authTypeGuardMap);
    // authTypes from reflector
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // console.log(authTypes);

    //array of guards
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // console.log(guards);

    //default error handler
    let error = new UnauthorizedException();

    // loop guards canActivate

    for (const instance of guards) {
      // console.log(instance);

      const canActivate = await Promise.resolve(
        instance?.canActivate(context),
      ).catch((err) => {
        error = err;
      });

      // console.log({ canActivate });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
