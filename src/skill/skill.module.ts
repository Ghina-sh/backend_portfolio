import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { SkillRepository } from './skill.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entity/skill.entity';
import { FileUploadsModule } from 'src/file-uploads/file-uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), FileUploadsModule],
  controllers: [SkillController],
  providers: [SkillService, SkillRepository],
})
export class SkillModule {}
