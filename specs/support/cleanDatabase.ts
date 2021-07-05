import DatabaseCleaner from 'database-cleaner';
import { Pool } from 'pg';

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
};
const databaseCleaner = new DatabaseCleaner('postgresql');

export default async () => {
  const connection = new Pool(config);
  try {
    return new Promise((res, rej) => {
      databaseCleaner.clean(connection, (err) => {
        if (err) return rej(err);
        connection.end();
        return res(null);
      });
    });
  } catch (error) {
    console.error('Error on truncate database tables ');
  }
};
