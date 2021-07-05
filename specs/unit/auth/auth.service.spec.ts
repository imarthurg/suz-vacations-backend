import { BadRequestException } from '@nestjs/common';

import { UserEntity } from '@App/modules/resources/entities/user.entity';
import { AuthService } from '@App/modules/auth/auth.service';
import { FactoryBot } from '@Support/factories';

const mockUsersService = {
  async findOneByEmail(email: string) {},
  async encryptPassword(input: string) {
    return { psswd: input, salt: 'salt' };
  },
  async update(id, data) {},
} as any;

const mockJwtService = {} as any;

const mockMailCommunicationsService = {
  async sendRecoverPassword(email: string, data: { password: string }) {},
} as any;

describe('Given AuthService', () => {
  const service = new AuthService(
    mockUsersService,
    mockJwtService,
    mockMailCommunicationsService,
  );

  describe('When call #recoverPassword', () => {
    describe('When there is an user with the passed email', () => {
      it('Then send the password to the user email', async () => {
        const user = FactoryBot.build('user') as UserEntity;
        const spys = MockDependentServices.mockSuccessCase(user);

        await service.recoverPassword(user.email);

        spys.forEach((spy) => expect(spy).toBeCalled());
      });
    });

    describe('When there is NOT an user with the passed email', () => {
      it('Then throws an error', async () => {
        const spys = MockDependentServices.mockErrorCase();

        spys.forEach((spy) => expect(spy).toBeCalled());
        expect(
          service.recoverPassword('no_exists@test.com.br'),
        ).rejects.toThrowError(BadRequestException);
      });
    });
  });
});

class MockDependentServices {
  static mockSuccessCase(user) {
    const spyOnUsersService = jest
      .spyOn(mockUsersService, 'findOneByEmail')
      .mockResolvedValueOnce(user);
    const spyOnMailCommunicationsService = jest
      .spyOn(mockMailCommunicationsService, 'sendRecoverPassword')
      .mockResolvedValueOnce('ok');

    return [spyOnUsersService, spyOnMailCommunicationsService];
  }

  static mockErrorCase() {
    const spyOnUsersService = jest
      .spyOn(mockUsersService, 'findOneByEmail')
      .mockRejectedValueOnce(new BadRequestException());

    return [spyOnUsersService];
  }
}
