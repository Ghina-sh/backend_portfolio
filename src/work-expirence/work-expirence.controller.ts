import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { WorkExpirenceService } from './work-expirence.service';
import { Experience } from './entity/experianc.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseImageFilePipe } from 'src/file-uploads/pipes/file-parser.pipe';
import { CreateExperienceDto } from './dto/create-expirence.dto';
import { UpdateExperienceDto } from './dto/update-expirence.dto';

@Controller('experience')
export class WorkExpirenceController {
  constructor(private workExpirenceService: WorkExpirenceService) {}

  @Get('all')
  async getAllExperience(): Promise<Experience[]> {
    return this.workExpirenceService.getAllExperience();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createExperience(
    @Body() createExperienceDto: CreateExperienceDto,
    @UploadedFile(parseImageFilePipe)
    image: Express.Multer.File,
  ): Promise<Experience> {
    return this.workExpirenceService.createExperience(
      createExperienceDto,
      image,
    );
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateExperience(
    @Body() updateExperienceDto: UpdateExperienceDto,
    @Param('id') id: string,
    @UploadedFile(parseImageFilePipe)
    image: Express.Multer.File,
  ): Promise<Experience> {
    return this.workExpirenceService.updateExperience(
      updateExperienceDto,
      image,
      id,
      
    );
  }

  @Delete(':id')
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.workExpirenceService.deleteExperience(id);
  }
}
