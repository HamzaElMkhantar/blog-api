import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class UploadToAwsService {
  constructor(private readonly configService: ConfigService) {}

  public async fileUpload(file: Express.Multer.File) {
    try {
      console.log(file);
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get<string>('appConfig.awsBucketName'),
          Key: this.generateFileName(file),
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: 'Failed to upload file to AWS S3',
      });
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // extract file name
    const name = file.originalname.split('.')[0];
    // Remove white spaces
    name.replace(/\s/g, '').trim();
    // extract the extension
    const extension = path.extname(file.originalname);
    // Generate time stamp
    const timeStamp = new Date().getTime().toString().trim();
    // return file uuid

    return `${name}-${timeStamp}-${uuid4()}.${extension}`;
  }
}
