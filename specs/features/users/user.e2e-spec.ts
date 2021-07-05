import { getRepository } from 'typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { Role } from '@App/common/auth/roles.enum';
import {
  Requester,
  TestApplicationInitializer,
} from '@Support/test-application-initializer';
import { TestUserAuthenticated } from '@Support/test-users-auth';
import { UserEntity } from '@App/modules/resources/entities/user.entity';

describe('Given UsersController (e2e)', () => {
  let app: INestApplication;
  let request: Requester;
  let user, accessToken;

  beforeEach(async () => {
    ({ app, request } = await new TestApplicationInitializer().init());
    ({ user, accessToken } = await createCustomer(app));
  });

  afterEach(async () => {
    await app.close();
  });

  describe('When (POST) /accept-use-terms', () => {
    describe('When is not authenticated', () => {
      it('Then return UNAUTHORIZED', async () => {
        const response = await request.post('/users/accept-use-terms');

        expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('When is everything ok', () => {
      it('Then return SUCCESS', async () => {
        const response = await request
          .post('/users/accept-use-terms')
          .set('Authorization', `Bearer ${accessToken}`);

        const updatedUser = (await getRepository('users').findOne(
          user.id,
        )) as UserEntity;

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(updatedUser.acceptedUseTerms).toBeDefined();
      });
    });
  });
});

async function createCustomer(app) {
  return new TestUserAuthenticated(app).create(Role.CUSTOMER).build();
}
