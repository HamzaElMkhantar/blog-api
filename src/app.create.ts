import { INestApplication } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
// import { DataResponseInterceptor } from './common/interceptors/data-response.interceptor';
export function appCreate(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Allows automatic conversion of values to their expected types during transformation
      },
    }),
  );
  const loggerInstance = app.get(Logger);
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Blog Application API Documentation')
    .setDescription(
      'This documentation covers the REST API for a blog application built on NestJS, designed for seamless content management. The API offers secure and structured endpoints for creating, retrieving, updating, and deleting blog posts, comments, and categories. Each endpoint is built with scalability, performance, and security as core priorities, ensuring a robust API that can scale with application demand. This documentation provides all necessary information for developers to integrate, use, and extend the API efficiently.',
    )
    .setTermsOfService('http://localhost:3000/terms')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  // Instantiate Document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  // setup the aws sdk used uploading the files to aws s3 bucket
  const configService = app.get(ConfigService);

  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  // enable cors
  app.enableCors({
    origin: 'http://localhost:3500',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // app.useGlobalInterceptors(new DataResponseInterceptor());
}
