import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  autoLoadEntities: process.env.NODE_ENV !== 'production',
  synchronize: process.env.NODE_ENV !== 'production', //? only in dev mode turn it to false on the production
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME,
}));
