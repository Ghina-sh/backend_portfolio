import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entity/project.entity';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { parseImageFilePipe } from 'src/file-uploads/pipes/file-parser.pipe';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('all')
  async getAllProjects(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Project> {
    return this.projectService.findProjectById(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImage', maxCount: 1 },
      { name: 'des1Image', maxCount: 1 },
      { name: 'des2Image', maxCount: 1 },
      { name: 'des3Image', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
    ]),
  )
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles()
    files: {
      mainImage?: Express.Multer.File[];
      des1Image?: Express.Multer.File[];
      des2Image?: Express.Multer.File[];
      des3Image?: Express.Multer.File[];
      logo?: Express.Multer.File[];
    },
  ): Promise<Project> {
    const { mainImage, des1Image, des2Image, des3Image, logo } = files;
    return this.projectService.createProject(
      createProjectDto,
      mainImage[0],
      des1Image[0],
      des2Image[0],
      des3Image[0],
      logo[0],
    );
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImage', maxCount: 1 },
      { name: 'des1Image', maxCount: 1 },
      { name: 'des2Image', maxCount: 1 },
      { name: 'des3Image', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
    ]),
  )
  async updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      mainImage?: Express.Multer.File[];
      des1Image?: Express.Multer.File[];
      des2Image?: Express.Multer.File[];
      des3Image?: Express.Multer.File[];
      logo?: Express.Multer.File[];
    },
  ): Promise<Project> {
    const { mainImage, des1Image, des2Image, des3Image, logo } = files;
    return this.projectService.updateProject(
      updateProjectDto,
      id,
      mainImage[0],
      des1Image[0],
      des2Image[0],
      des3Image[0],
      logo[0],
    );
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<void> {
    return this.projectService.deleteProject(id);
  }
}
