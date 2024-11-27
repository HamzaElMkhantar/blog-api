import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { UsersCreateManyService } from './providers/users-create-many.service';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserService } from './providers/create-user.service';
import { FindOneUserByEmailService } from './providers/find-one-user-by-email.service';
import { FindOneByGoogleIdService } from './providers/find-one-by-google-id.service';
import { CreateGoogleUserService } from './providers/create-google-user.service';
// import jwtConfig from 'src/auth/config/jwt.config';
// import { JwtModule } from '@nestjs/jwt';
// import { APP_GUARD } from '@nestjs/core';
// import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    // ? ---  Explanation of why commenting the ConfigModule.forRoot code below  ----
    // Global vs Feature Configuration:
    // ConfigModule.forRoot: This initializes the configuration system and should only be called once per application, typically in the AppModule. It sets up global configurations and optionally loads configuration files (like profileConfig).
    // ConfigModule.forFeature: This is used to load specific configurations for a particular module (in this case, profileConfig for UsersModule).
    // ? ---  Explanation End  ----

    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [profileConfig],
    // }),
    ConfigModule.forFeature(profileConfig),
    forwardRef(() => AuthModule),

    // ? commenting the config related to the guards below (AccessTokenGuard)
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyService,
    CreateUserService,
    FindOneUserByEmailService,
    FindOneByGoogleIdService,
    CreateGoogleUserService,
    // //? Apply the guard globally to the entire module and application, ensuring all routes are protected
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
  exports: [UsersService, FindOneUserByEmailService],
})
export class UsersModule {}
