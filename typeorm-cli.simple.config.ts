import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '48731151',
  database: 'nestjs-blog',
  host: 'localhost',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
