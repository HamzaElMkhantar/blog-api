import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { UploadToAwsService } from './upload-to-aws.service';
import { ConfigService } from '@nestjs/config';
import { UploadFileInterface } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload) private readonly uploadRepo: Repository<Upload>,
    private readonly uploadToAwsService: UploadToAwsService,
    private readonly configService: ConfigService,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    try {
      console.log({ file });
      // throw Error for unSupported MIME types
      if (
        !['image/jpeg', 'image/gif', 'image/jpg', 'image/png'].includes(
          file.mimetype,
        )
      ) {
        throw new BadRequestException('Unsupported file type', {
          description: 'Only JPEG, GIF, JPG and PNG images are supported.',
        });
      }

      // validate file size
      if (file.size > +this.configService.get<number>('appConfig.maxSize')) {
        throw new BadRequestException('File too large', {
          description: 'The file size exceeds the maximum allowed size.',
        });
      }

      // upload the file to aws s3
      const name = await this.uploadToAwsService.fileUpload(file);

      //Generate a new entry in database
      const uploadFile: UploadFileInterface = {
        name,
        path: `https://${this.configService.get<string>('appConfig.awsCloudfrontUrl')}/${name}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadRepo.create(uploadFile);

      return await this.uploadRepo.save(upload);
    } catch (err) {
      throw new ConflictException(err, {
        description: 'Failed to upload the file.',
      });
    }
  }
}
