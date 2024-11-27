import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './providers/upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { UploadToAwsService } from './providers/upload-to-aws.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadToAwsService],
  imports: [TypeOrmModule.forFeature([Upload])],
  exports: [],
})
export class UploadModule {}
