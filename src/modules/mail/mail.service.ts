import { Injectable } from '@nestjs/common';
import { Optional } from '@nestjs/common';
import { join } from 'path';
import pug from 'pug';

import { mailer } from './mail.config';
import { IMail, IMailData } from './mail.interface';

const TEMPLATES_PATH = './templates';

@Injectable()
export class MailService {
  private mailer: IMail;

  constructor(@Optional() options: any) {
    this.mailer = options?.mailer || mailer;
  }

  async sendMailTemplate(data: IMailData) {
    const { template, to, from, subject } = data;

    if (!template) {
      throw new Error('There is no template to send');
    }

    const text = this.renderTemplate(template.name, template.data);

    return this.sendMail({ from, to, text, subject });
  }

  async sendMail(data: IMailData) {
    await this.mailer.send(data);
  }

  private renderTemplate(name: string, data: any) {
    const templatePath = this.getTemplatePath(name);

    try {
      return pug.renderFile(templatePath, data);
    } catch (e) {
      throw new Error(`Error in the template rendering: ${e.message}`);
    }
  }

  private getTemplatePath(name: string) {
    return join(__dirname, TEMPLATES_PATH, `${name}.pug`);
  }
}
