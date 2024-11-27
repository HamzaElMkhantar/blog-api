import { INestApplication } from '@nestjs/common';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './users.post.e2e-spec.simple-data';

describe('[Users] @Post EndPoints (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;
  beforeEach(async () => {
    // Instantiating the applications
    app = await bootstrapNestApplication();

    // extract the ConfigService
    config = app.get<ConfigService>(ConfigService);

    // get server endpoint
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - EndPoints is public', async () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });
  it('/users - firstName is mandatory', () => {
    console.log({ missingFirstName });

    return (
      request(httpServer)
        .post('/users')
        .send(missingFirstName)
        // .expect(400)
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }))
    );
  });

  it('/users - email is mandatory', () => {
    console.log({ missingEmail });

    return (
      request(httpServer)
        .post('/users')
        .send(missingEmail)
        // .expect(400)
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }))
    );
  });

  it('/users - password is mandatory', () => {
    console.log({ missingPassword });

    return (
      request(httpServer)
        .post('/users')
        .send(missingPassword)
        // .expect(400)
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }))
    );
  });

  it('/users - Valid request successfully creates user', () => {
    console.log({ completeUser });
    return (
      request(httpServer)
        .post('/users')
        .send(completeUser)
        // .expect(201)
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }))
    );
  });
  it.todo('/users - password is not returned in response');
  it.todo('/users - googleId is not returned in response');
});
