import { Module } from '@nestjs/common';
import { FileUploadsController } from './file-uploads.controller';
import { FileUploadsService } from './file-uploads.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  controllers: [FileUploadsController],
  providers: [FileUploadsService, CloudinaryProvider],
  exports: [CloudinaryProvider, FileUploadsService],
})
export class FileUploadsModule {}
