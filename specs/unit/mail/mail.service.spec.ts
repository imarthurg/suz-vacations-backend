import { MailService } from '@App/modules/mail/mail.service';

const mailerMock = { send: async (data) => {} };
const serviceMock = new MailService({ mailer: mailerMock });

describe('Given Mail Service', () => {
  const service: MailService = serviceMock;

  describe('When call sendMail', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(mailerMock, 'send');
    });

    it('Then sendMail should have been called', async () => {
      await service.sendMail({ to: '', from: '', text: '', subject: '' });

      expect(spy).toHaveBeenCalled();
    });
  });
});
