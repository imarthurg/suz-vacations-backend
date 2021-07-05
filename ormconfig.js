const isProd = process.env.NODE_ENV === 'prod';
const isTest = process.env.NODE_ENV === 'test';
const showORMLogs = process.env.SHOW_ORM_LOGS === 'true';
const hasToRunMigrations = process.env.RUN_ORM_MIGRATIONS === 'true';
const sslConfig = isProd ? { rejectUnauthorized: false } : false;

const entities = isTest
  ? [`${__dirname}/src/modules/**/*.entity{.ts,.js}`]
  : [`${__dirname}/dist/**/*.entity{.ts,.js}`];
const migrations = isTest
  ? [`${__dirname}/src/database/migrations/*{.ts,.js}`]
  : [`${__dirname}/dist/database/migrations/*{.ts,.js}`];

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  logging: showORMLogs,
  synchronize: false,
  migrationsRun: hasToRunMigrations,
  entities,
  migrations,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  extra: {
    ssl: sslConfig,
  },
};
