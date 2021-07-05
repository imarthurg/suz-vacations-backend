import SGMail from '@sendgrid/mail';

import { ConfigService } from '@App/modules/shared/services/config.service';
import { IMail, IMailData } from './mail.interface';

const configService = new ConfigService();

const MAIL_CONFIG = Object.freeze({
  API_KEY: configService.SendGridApiKey,
});

class Mailer implements IMail {
  private mailProvider: any;

  constructor(mailProvider: any) {
    this.mailProvider = mailProvider;

    // Provider Configs
    this.mailProvider.setApiKey(MAIL_CONFIG.API_KEY);
  }

  async send(data: IMailData): Promise<void> {
    const { to, from, text, subject } = data;

    await this.mailProvider.send({ to, from, text, subject });
  }
}

const mailer = new Mailer(SGMail);

export { MAIL_CONFIG, mailer };
