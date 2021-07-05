import cleanDatabase from '@Support/cleanDatabase';

if (process.env.IS_IN_CI) {
  jest.setTimeout(30000);
}

beforeAll(async () => {
  await cleanDatabase();
});

afterEach(async () => {
  await cleanDatabase();
});
