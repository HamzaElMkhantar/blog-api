import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  maxSize: process.env.MAX_SIZE,
  mailHost: process.env.MAIL_HOST,
  mstpUsername: process.env.MSTP_USERNAME,
  mstpPassword: process.env.MSTP_PASSWORD,
}));

// ? Below is the previous version of the appConfig function

// export const appConfig = () => ({
//   environment: process.env.NODE_ENV || 'production',
// database: {
//   autoLoadEntities: process.env.NODE_ENV !== 'production',
//   synchronize: process.env.NODE_ENV !== 'production', //? only in dev mode turn it to false on the production
//   port: parseInt(process.env.DATABASE_PORT) || 5432,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   host: process.env.DATABASE_HOST || 'localhost',
//   database: process.env.DATABASE_NAME,
// },
// });
