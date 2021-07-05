import { MailService } from '@App/modules/mail/mail.service';
import { MailCommunicationsService } from '@App/modules/mail/mail-communications.service';
import { ConfigService } from '@App/modules/shared/services/config.service';

const mailerMock = { send: async (data) => {} };

describe('Given Mail CommunicationsService', () => {
  const service = new MailCommunicationsService(
    new MailService({ mailer: mailerMock }),
    new ConfigService(),
  );

  describe('When call #sendRecoverPasswowrd', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(mailerMock, 'send');
    });

    it("Then the mailer's send method should have been called", async () => {
      await service.sendRecoverPassword({
        email: 'test@test.com.br',
        password: 'test@1234',
      });

      expect(spy).toHaveBeenCalled();
    });
  });
});
