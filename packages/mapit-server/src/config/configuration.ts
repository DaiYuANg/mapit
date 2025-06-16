import { randomBytes } from 'node:crypto';

export interface DatabaseConfig {
  type: 'mysql' | 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface UserConfig {
  defaultUser: string;
  defaultUserPassword: string;
}

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  user: UserConfig;
  cache: CacheConfig;
  jwt: JwtConfig;
}

export interface CacheConfig {
  store: 'memory' | 'redis';
  host?: string;
  port?: number;
  ttl: number;
  max?: number;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string; // e.g., '7d', '1h'
}

const randomSecret = () => randomBytes(32).toString('hex');

export default (): AppConfig => ({
  port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
  database: {
    type: (process.env.DATABASE_TYPE as DatabaseConfig['type']) || 'better-sqlite3',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || ':memory:',
  },
  user: {
    defaultUser: process.env.DEFAULT_USER || 'admin',
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD || '123456',
  },
  cache: {
    store: (process.env.CACHE_STORE as CacheConfig['store']) || 'memory',
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT ? parseInt(process.env.CACHE_PORT, 10) : undefined,
    ttl: parseInt(process.env.CACHE_TTL || '60', 10),
    max: process.env.CACHE_MAX ? parseInt(process.env.CACHE_MAX, 10) : undefined,
  },
  jwt: {
    secret: process.env.JWT_SECRET || randomSecret(),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});
