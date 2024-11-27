import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('--------------- Interceptor before Execution ---------------');
    return next.handle().pipe(
      map((data) => {
        console.log(
          '--------------- Interceptor after Execution ---------------',
        );
        console.log({
          apiVersion: this.configService.get('appConfig.apiVersion'),
          data,
        });
        return {
          apiVersion: this.configService.get('appConfig.apiVersion'),
          data,
        };
      }),
    );
  }
}
