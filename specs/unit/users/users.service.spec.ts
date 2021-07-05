import { INestApplication } from '@nestjs/common';
import Faker from 'faker';

import { UsersService } from '@App/modules/resources/services';
import { FactoryBot } from '@Support/factories';
import { TestApplicationInitializer } from '@Support/test-application-initializer';

const userId = Faker.datatype.uuid();
const mockRepository = {
  create(data) {
    return { ...data };
  },
  async save(data) {
    return {
      id: Faker.datatype.uuid(),
      ...data,
      createdAt: new Date(),
      updateAt: new Date(),
    };
  },
  async findOne(opts) {},
} as any;
const mockService = new UsersService(mockRepository);

describe('Given Users Service', () => {
  let app: INestApplication;
  let service: UsersService;

  beforeAll(async () => {
    ({ app } = await new TestApplicationInitializer()
      .overrideProvider(UsersService, mockService)
      .init());

    service = await app.get(UsersService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('When call #create', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Then create an user', async () => {
      const userData = FactoryBot.build('user', {
        password: 'test@1234',
      }) as any;
      const spyRepository = jest
        .spyOn(mockRepository, 'findOne')
        .mockResolvedValueOnce(null);
      const spyPsswdEncrypt = jest.spyOn(service, 'encryptPassword');

      const user = await service.create(userData);
      const { name, email, role } = user;

      expect(spyRepository).toBeCalled();
      expect(spyPsswdEncrypt).toBeCalled();
      expect(user).toMatchObject({
        name,
        email,
        role,
      });
    });

    describe('When the users email already exits', () => {
      it('Then throws an error', () => {
        const fakeExistentUser = FactoryBot.build('user', {
          id: userId,
        }) as any;

        const spy = jest
          .spyOn(mockRepository, 'findOne')
          .mockResolvedValueOnce({ ...fakeExistentUser });

        expect(
          service.create({ email: fakeExistentUser.email } as any),
        ).rejects.toThrowError();
        expect(spy).toBeCalled();
      });
    });
  });

  describe('When call #encryptPassword', () => {
    it('Then returns the password encrypted', async () => {
      const psswd = 'test@1234';

      const encryptedPsswd = await service.encryptPassword(psswd);

      expect(encryptedPsswd.psswd).toBeDefined();
      expect(encryptedPsswd.salt).toBeDefined();
    });

    it('Then returns different hashes for the same input', async () => {
      const psswd = 'test@1234';
      const psswdCopy = 'test@1234';

      const encrypted = await service.encryptPassword(psswd);
      const encryptedCopy = await service.encryptPassword(psswdCopy);

      expect(encrypted.psswd).not.toBe(encryptedCopy.psswd);
    });
  });

  describe('When call #update', () => {
    describe('When the user exists', () => {
      it('Then update the user properly', async () => {
        const dto = FactoryBot.build('user');

        const spy = jest
          .spyOn(mockRepository, 'findOne')
          .mockResolvedValueOnce({ id: userId, ...dto });

        const updatedUser = await service.update(userId, dto);

        expect(spy).toBeCalled();
        expect(updatedUser).toMatchObject({ id: userId, ...dto });
      });
    });

    describe('When the user not exists', () => {
      it('Then returns an error', async () => {
        const fakeUUID = Faker.datatype.uuid();

        expect(service.update(fakeUUID, {})).rejects.toThrowError(
          'User not exists',
        );
      });
    });
  });
});
