import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailCommunicationsService } from '@App/modules/mail/mail-communications.service';
import { checkNotExists } from '@App/common/helpers/validations';
import { UsersService } from '../resources/services';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailCommunicationsService: MailCommunicationsService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const { psswd } = await this.usersService.encryptPassword(
      password,
      user.salt,
    );

    if (user && user.password === psswd) {
      const { password, salt, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const { id, role, company, acceptedUseTerms } = user;
    const payload = {
      sub: id,
      role,
      companyName: company.name,
      companyId: company.id,
      acceptedUseTerms,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async recoverPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    checkNotExists(user, 'Email not found');

    const randomInput = Math.random().toString(32);
    const { psswd: newPassword, salt } =
      await this.usersService.encryptPassword(randomInput);

    await this.usersService.update(user.id, { password: newPassword, salt });

    return this.mailCommunicationsService.sendRecoverPassword({
      email: user.email,
      password: newPassword,
    });
  }
}
