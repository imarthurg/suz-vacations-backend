import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@App/modules/resources/services';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { MailModule } from '@App/modules/mail/mail.module';
import { SharedModule } from '@App/modules/shared/shared.module';
import { UsersRepository } from '@App/modules/resources/repositories/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import AUTH_CONFIG from './auth.config';

@Module({
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.register(AUTH_CONFIG.jwtModule()),
    TypeOrmModule.forFeature([UsersRepository]),
    MailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
