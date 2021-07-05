import { INestApplication } from '@nestjs/common';
import {
  Requester,
  TestApplicationInitializer,
} from '@Support/test-application-initializer';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let request: Requester;

  beforeEach(async () => {
    ({ app, request } = await new TestApplicationInitializer().init());
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request.get('/').expect(200).expect("I'm healthy!");
  });
});
