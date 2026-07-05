import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Creates a repository for the User entity
  controllers: [UsersController],
  providers: [UsersService, AuthService, {
    provide: APP_INTERCEPTOR, // Register the CurrentUserInterceptor as a global interceptor
    useClass: CurrentUserInterceptor, // Use the CurrentUserInterceptor for all requests
  }], // Register the CurrentUserInterceptor as a provider
})
export class UsersModule {}
