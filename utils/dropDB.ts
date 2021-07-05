const pgtools = require('pgtools');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
};

async function dropDB() {
  console.log('DB Drop started...');

  return new Promise((res, rej) => {
    pgtools.dropdb(
      {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 5432,
        host: process.env.DB_HOST,
      },
      config.database,
      (err) => {
        if (err) {
          console.log(`Error while trying to drop ${config.database}`);
          return rej(err);
        }

        console.log(`Successfully dropped ${config.database}`);
        res(null);
      },
    );
  });
}

dropDB();
