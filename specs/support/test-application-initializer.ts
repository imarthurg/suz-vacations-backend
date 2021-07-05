import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@App/app.module';

type Requester = request.SuperTest<request.Test>;

interface ITestApp {
  app: INestApplication;
  request: Requester;
}

class TestApplicationInitializer {
  private app: INestApplication;
  private request: Requester;

  private moduleFixture: TestingModuleBuilder;

  constructor(configs?: ModuleMetadata) {
    this.moduleFixture = Test.createTestingModule({
      ...(configs || { imports: [AppModule] }),
    });
  }

  overrideProvider(provider: any, value: any): TestApplicationInitializer {
    this.moduleFixture.overrideProvider(provider).useValue(value);
    return this;
  }

  private getApp() {
    return this.app;
  }

  private setApp(value: INestApplication) {
    this.app = value;
  }

  private getRequest() {
    return this.request;
  }

  private setRequest(value: Requester) {
    this.request = value;
  }

  async init(): Promise<ITestApp> {
    const compiledModuleFixture = await this.moduleFixture.compile();
    const appInstance = compiledModuleFixture.createNestApplication();

    this.setApp(await appInstance.init());
    this.setRequest(request(this.getApp().getHttpServer()));

    return {
      app: this.getApp(),
      request: this.getRequest(),
    };
  }
}

export { ITestApp, Requester, TestApplicationInitializer };
