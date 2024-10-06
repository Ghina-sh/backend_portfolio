import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entity/project.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    const projects = await this.projectRepository.find();

    const projectData = instanceToPlain(projects, {
      groups: ['send'],
    }) as Project[];

    return projectData;
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    return project;
  }

  async insert(createProjectDto: CreateProjectDto): Promise<Project> {
    const {
      name,
      company,
      type,
      platform,
      mainImageUrl,
      des1ImageUrl,
      des2ImageUrl,
      des3ImageUrl,
      logoUrl,
      date,
      myWorks,
      demoLink,
      describtion,
    } = createProjectDto;
    const project = this.projectRepository.create({
      name,
      company,
      type,
      platform,
      mainImageUrl,
      des1ImageUrl,
      des2ImageUrl,
      des3ImageUrl,
      logoUrl,
      myWorks,
      demoLink,
      date,
      describtion,
    });

    await this.projectRepository.save(project);
    return project;
  }

  async update(
    updateProjectDto: UpdateProjectDto,
    id: string,
  ): Promise<Project> {
    const {
      name,
      company,
      type,
      platform,
      mainImageUrl,
      des1ImageUrl,
      des2ImageUrl,
      des3ImageUrl,
      date,
      logoUrl,
      myWorks,
      demoLink,
      describtion,
    } = updateProjectDto;
    const project = await this.findById(id);

    if (name) {
      project.name = name;
    }
    if (company) {
      project.company = company;
    }
    if (type) {
      project.type = type;
    }
    if (platform) {
      project.platform = platform;
    }
    if (mainImageUrl) {
      project.mainImageUrl = mainImageUrl;
    }
    if (des1ImageUrl) {
      project.des1ImageUrl = des1ImageUrl;
    }
    if (des2ImageUrl) {
      project.des2ImageUrl = des2ImageUrl;
    }
    if (des3ImageUrl) {
      project.des3ImageUrl = des3ImageUrl;
    }
    if (logoUrl) {
      project.logoUrl = logoUrl;
    }
    if (date) {
      project.date = date;
    }
    if (myWorks) {
      project.myWorks = myWorks;
    }
    if (demoLink) {
      project.demoLink = demoLink;
    }
    if (describtion) {
      project.describtion = describtion;
    }

    try {
      await this.projectRepository.save(project);
    } catch (error) {
      console.log(error.code);

      if (error.code === '23505') {
        throw new ConflictException('already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return project;
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.projectRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID '${id}' not found`);
    }
  }
}
