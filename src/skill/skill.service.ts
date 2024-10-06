import { Injectable } from '@nestjs/common';
import { SkillRepository } from './skill.repository';
import { Skill } from './entity/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    private skillRepository: SkillRepository,
    private readonly cloudinary: FileUploadsService,
  ) {}

  async getAllSkills(): Promise<Skill[]> {
    return await this.skillRepository.findAll();
  }

  async createSkill(
    createSkillDto: CreateSkillDto,
    image: Express.Multer.File,
  ): Promise<Skill> {
    const imageUrl = await this.cloudinary.upload(image);
    createSkillDto.imageUrl = imageUrl.url;

    return await this.skillRepository.insert(createSkillDto);
  }

  async updateSkill(
    updateSkillDto: UpdateSkillDto,
    image: Express.Multer.File,
    id: string,
  ): Promise<Skill> {
    const imageUrl = await this.cloudinary.upload(image);
    updateSkillDto.imageUrl = imageUrl.url;

    return await this.skillRepository.update(updateSkillDto, id);
  }

  async deleteSkill(id: string) {
    return this.skillRepository.deleteById(id);
  }
}
