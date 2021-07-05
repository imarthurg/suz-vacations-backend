import { Module } from '@nestjs/common';

import { UsersController } from './controllers';
import { UsersService } from './services';

import { MailModule } from '@App/modules/mail/mail.module';
import { SharedModule } from '@App/modules/shared/shared.module';
import { AuthModule } from '@App/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    MailModule,
    AuthModule,
    SharedModule,
  ],
})
export class ResourcesModule {}
