import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Experience } from './entity/experianc.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExperienceDto } from './dto/create-expirence.dto';
import { UpdateExperienceDto } from './dto/update-expirence.dto';

@Injectable()
export class WorkExperianceRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly workExperianceRepository: Repository<Experience>,
  ) {}

  async findAll(): Promise<Experience[]> {
    const experiances = await this.workExperianceRepository.find();
    return experiances;
  }

  async insert(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const { name, date, logoUrl, myWorks } = createExperienceDto;
    const experience = this.workExperianceRepository.create({
      name,
      date,
      logoUrl,
      myWorks,
    });

    await this.workExperianceRepository.save(experience);
    return experience;
  }

  async update(
    updateExperienceDto: UpdateExperienceDto,
    id: string,
  ): Promise<Experience> {
    const { name, date, logoUrl, myWorks } = updateExperienceDto;
    const experience = await this.findById(id);

    if (name) {
      experience.name = name;
    }
    if (date) {
      experience.date = date;
    }
    if (logoUrl) {
      experience.logoUrl = logoUrl;
    }
    if (myWorks) {
      // TODO: 
      // experience.myWorks.clear();
      experience.myWorks = myWorks;
    }
    try {
      await this.workExperianceRepository.save(experience);
    } catch (error) {
      console.log(error.code);

      if (error.code === '23505') {
        throw new ConflictException('already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return experience;
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.workExperianceRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Experience with ID '${id}' not found`);
    }
  }

  async findById(id: string): Promise<Experience> {
    // const found = await this.taskRepository.findOneBy({ id });
    const found = await this.workExperianceRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Experience with ID '${id}' not found`);
    }

    return found;
  }
}
