import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { Project } from './entity/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadsModule } from 'src/file-uploads/file-uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), FileUploadsModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
