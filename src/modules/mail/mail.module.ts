import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailCommunicationsService } from './mail-communications.service';

@Module({
  providers: [MailService, MailCommunicationsService],
  exports: [MailCommunicationsService],
})
export class MailModule {}
