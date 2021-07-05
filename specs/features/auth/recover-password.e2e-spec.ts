import { INestApplication, HttpStatus } from '@nestjs/common';
import { getRepository } from 'typeorm';

import {
  Requester,
  TestApplicationInitializer,
} from '@Support/test-application-initializer';
import { UserEntity } from '@App/modules/resources/entities/user.entity';
import { TestUserAuthenticated } from '@Support/test-users-auth';
import { Role } from '@App/common/auth/roles.enum';
import { MailService } from '@App/modules/mail/mail.service';

const mailerMock = {
  send: async (data) => {
    console.log(`Fake email sending: ${JSON.stringify(data)}`);
  },
};
const mailServiceMock = new MailService({ mailer: mailerMock });

describe.only('Given POST /auth/recover-password', () => {
  let app: INestApplication;
  let request: Requester;
  let user: UserEntity;
  let accessToken: string;

  beforeEach(async () => {
    ({ app, request } = await new TestApplicationInitializer()
      .overrideProvider(MailService, mailServiceMock)
      .init());
    ({ user, accessToken } = await createCustomer(app));
  });

  afterEach(async () => {
    await app.close();
  });

  describe('When requested with payload correctly', () => {
    it('Then return SUCCESS, and recover the user password', async () => {
      const response = await request
        .post('/auth/recover-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: user.email });

      expect(response.statusCode).toBe(HttpStatus.OK);

      const updatedUser = (await getRepository('users').findOne(user.id)) as any;

      expect(updatedUser.password).not.toBe(user.password);
      expect(updatedUser.salt).not.toBe(user.salt);
    });
  });

  describe('When requested with invalid token', () => {
    it('Then return UNAUTHORIZED with no token', async () => {
      const response = await request.post('/auth/recover-password');

      expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(response.body.message).toBe('Unauthorized');
    });

    it('Then return FORBIDDEN with not permitted role', async () => {
      const { accessToken: notPermittedToken } = await createAdmin(app);

      const response = await request
        .post('/auth/recover-password')
        .set('Authorization', `Bearer ${notPermittedToken}`);

      expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(response.body.message).toBe('Forbidden resource');
    });
  });
});

async function createCustomer(app) {
  return new TestUserAuthenticated(app).create(Role.CUSTOMER).build();
}

async function createAdmin(app) {
  return new TestUserAuthenticated(app).create(Role.ADMIN).build();
}
