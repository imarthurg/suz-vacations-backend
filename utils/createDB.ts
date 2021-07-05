const pgtools = require('pgtools');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
};

async function createDB() {
  console.log('DB Creation started...');

  return new Promise((res, rej) => {
    pgtools.createdb(
      {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 5432,
        host: process.env.DB_HOST,
      },
      config.database,
      (err) => {
        if (err) {
          console.log(`Error while trying to create ${config.database}`);
          return rej(err);
        }

        console.log(`Successfully created ${config.database}`);
        res(null);
      },
    );
  });
}

createDB();
