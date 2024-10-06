import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadsService } from './file-uploads.service';

@Controller('upload')
export class FileUploadsController {
  constructor(private readonly uploadService: FileUploadsService) {}

  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.upload(file);
    return result;
  }
}
