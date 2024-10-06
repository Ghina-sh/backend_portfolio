import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entity/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { parseImageFilePipe } from 'src/file-uploads/pipes/file-parser.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Get('/all')
  async getAllExperiance(): Promise<Skill[]> {
    return this.skillService.getAllSkills();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createSkill(
    @Body() createSkillDto: CreateSkillDto,
    @UploadedFile(parseImageFilePipe)
    image: Express.Multer.File,
  ): Promise<Skill> {
    return this.skillService.createSkill(createSkillDto, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateSkill(
    @Body() updateSkillDto: UpdateSkillDto,
    @Param('id') id: string,
    @UploadedFile(parseImageFilePipe)
    image: Express.Multer.File,
  ): Promise<Skill> {
    return this.skillService.updateSkill(updateSkillDto, image, id);
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: string): Promise<void> {
    return this.skillService.deleteSkill(id);
  }
}
