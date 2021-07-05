import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MailModule } from '@App/modules/mail/mail.module';
import { SharedModule } from '@App/modules/shared/shared.module';
import { AuthModule } from '@App/modules/auth/auth.module';
import { ResourcesModule } from './modules/resources/resources.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ResourcesModule,
    MailModule,
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
