import * as process from 'node:process';

type DatabaseType = 'sqlite3' | 'postgres' | 'mysql';

const configuration = () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE || 'sqlite3',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

export { configuration };
export type { DatabaseType };
