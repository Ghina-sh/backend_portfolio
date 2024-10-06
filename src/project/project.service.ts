import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './entity/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private readonly cloudinary: FileUploadsService,
  ) {}

  getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  findProjectById(id: string): Promise<Project> {
    return this.projectRepository.findById(id);
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    mainImage?: Express.Multer.File,
    des1Image?: Express.Multer.File,
    des2Image?: Express.Multer.File,
    des3Image?: Express.Multer.File,
    logo?: Express.Multer.File,
  ): Promise<Project> {
    if (mainImage) {
      const mainImageUrl = await this.cloudinary.upload(mainImage);
      createProjectDto.mainImageUrl = mainImageUrl.url;
    }

    if (des1Image) {
      const des1ImageUrl = await this.cloudinary.upload(des1Image);
      createProjectDto.des1ImageUrl = des1ImageUrl.url;
    }

    if (des2Image) {
      const des2ImageUrl = await this.cloudinary.upload(des2Image);
      createProjectDto.des2ImageUrl = des2ImageUrl.url;
    }

    if (des3Image) {
      const des3ImageUrl = await this.cloudinary.upload(des3Image);
      createProjectDto.des3ImageUrl = des3ImageUrl.url;
    }

    if (logo) {
      const logoUrl = await this.cloudinary.upload(logo);
      createProjectDto.logoUrl = logoUrl.url;
    }

    return this.projectRepository.insert(createProjectDto);
  }

  async updateProject(
    updateProjectDto: UpdateProjectDto,
    id: string,
    mainImage?: Express.Multer.File,
    des1Image?: Express.Multer.File,
    des2Image?: Express.Multer.File,
    des3Image?: Express.Multer.File,
    logo?: Express.Multer.File,
  ): Promise<Project> {
    if (mainImage) {
      const mainImageUrl = await this.cloudinary.upload(mainImage);
      updateProjectDto.mainImageUrl = mainImageUrl.url;
    }

    if (des1Image) {
      const des1ImageUrl = await this.cloudinary.upload(des1Image);
      updateProjectDto.des1ImageUrl = des1ImageUrl.url;
    }

    if (des2Image) {
      const des2ImageUrl = await this.cloudinary.upload(des2Image);
      updateProjectDto.des2ImageUrl = des2ImageUrl.url;
    }

    if (des3Image) {
      const des3ImageUrl = await this.cloudinary.upload(des3Image);
      updateProjectDto.des3ImageUrl = des3ImageUrl.url;
    }

    if (logo) {
      const logoUrl = await this.cloudinary.upload(logo);
      updateProjectDto.logoUrl = logoUrl.url;
    }

    return await this.projectRepository.update(updateProjectDto, id);
  }

  async deleteProject(id: string) {
    return this.projectRepository.deleteById(id);
  }
}
