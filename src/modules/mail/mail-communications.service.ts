import { Injectable } from '@nestjs/common';

import { ConfigService } from '@App/modules/shared/services/config.service';
import { MailService } from './mail.service';

@Injectable()
export class MailCommunicationsService {
  constructor(
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async sendRecoverPassword({ email, password }) {
    const template = {
      name: 'recover-password',
      data: {
        password,
        frontendAppURL: this.configService.frontendAppURL,
      },
    };

    return this.mailService.sendMailTemplate({
      from: this.configService.NoReplyEmail,
      subject: 'SUZ Férias - Recuperação de senha',
      to: email,
      template,
    });
  }
}
