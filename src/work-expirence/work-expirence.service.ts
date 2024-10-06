import { Injectable } from '@nestjs/common';
import { WorkExperianceRepository } from './work-experiance.repository';
import { Experience } from './entity/experianc.entity';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';
import { CreateExperienceDto } from './dto/create-expirence.dto';
import { UpdateExperienceDto } from './dto/update-expirence.dto';

@Injectable()
export class WorkExpirenceService {
  constructor(
    private workExperianceRepository: WorkExperianceRepository,
    private readonly cloudinary: FileUploadsService,
  ) {}

  async getAllExperience(): Promise<Experience[]> {
    return await this.workExperianceRepository.findAll();
  }

  async createExperience(
    createExperienceDto: CreateExperienceDto,
    image: Express.Multer.File,
  ): Promise<Experience> {
    const imageUrl = await this.cloudinary.upload(image);
    createExperienceDto.logoUrl = imageUrl.url;

    return await this.workExperianceRepository.insert(createExperienceDto);
  }

  async updateExperience(
    updateExperienceDto: UpdateExperienceDto,
    image: Express.Multer.File,
    id: string,
  ): Promise<Experience> {
    const imageUrl = await this.cloudinary.upload(image);
    updateExperienceDto.logoUrl = imageUrl.url;

    return await this.workExperianceRepository.update(updateExperienceDto, id);
  }

  async deleteExperience(id: string) {
    return this.workExperianceRepository.deleteById(id);
  }
}
