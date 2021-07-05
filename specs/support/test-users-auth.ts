import { JwtService } from '@nestjs/jwt';
import { FactoryBot } from '@Support/factories';
import { INestApplication } from '@nestjs/common';

import { Role } from '@App/common/auth/roles.enum';
import { UserEntity } from '@App/modules/resources/entities/user.entity';
import { UsersService } from '@App/modules/resources/services';
import { UserCreateDto } from '@App/modules/resources/dto/user-create.dto';
import { getRepository } from 'typeorm';

export class TestUserAuthenticated {
  private app: INestApplication;
  private user: UserEntity | any;
  private accessToken: string;

  constructor(app: INestApplication) {
    this.app = app;
  }

  create(role: Role = Role.ADMIN, data?: UserCreateDto) {
    this.user = FactoryBot.build(
      'user',
      data || {
        role,
        password: 'test@1234',
      },
    ) as UserCreateDto;
    return this;
  }

  async build(): Promise<{ user: UserEntity; accessToken: string }> {
    const userService = this.app.get(UsersService);
    const jwtService = this.app.get(JwtService);

    const company = await getRepository('companies').save(this.user.company);

    this.user = await userService.create({
      ...this.user,
      companyId: company.id,
    });
    const { id, role, acceptedUseTerms } = this.user;

    const payload = {
      sub: id,
      role,
      companyName: company.name,
      acceptedUseTerms,
    };

    this.accessToken = jwtService.sign(payload);

    return {
      user: this.user,
      accessToken: this.accessToken,
    };
  }
}
