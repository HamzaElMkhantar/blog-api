import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // create the connection data source
  const appDataSource = await new DataSource({
    type: 'postgres',
    // entities: [User, Post],
    synchronize: config.get('database.synchronize'), //? only in dev mode turn it to false on the production
    port: +config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.database'),
  });

  // drop all tables
  await appDataSource.dropDatabase();

  // close the connection
  await appDataSource.destroy();
}
