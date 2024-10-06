import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entity/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillRepository {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    const skills = await this.skillRepository.find();
    return skills;
  }

  async insert(createSkillDto: CreateSkillDto): Promise<Skill> {
    const { name, imageUrl: image, type } = createSkillDto;
    const skill = this.skillRepository.create({
      name,
      imageUrl: image,
      type,
    });

    await this.skillRepository.save(skill);
    return skill;
  }

  async update(updateSkillDto: UpdateSkillDto, id: string): Promise<Skill> {
    const { name, imageUrl: image, type } = updateSkillDto;
    const skill = await this.findById(id);

    if (name) {
      skill.name = name;
    }
    if (image) {
      skill.imageUrl = image;
    }
    if (type) {
      skill.type = type;
    }
    try {
      await this.skillRepository.save(skill);
    } catch (error) {
      console.log(error.code);

      if (error.code === '23505') {
        throw new ConflictException('already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return skill;
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.skillRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID '${id}' not found`);
    }
  }

  async findById(id: string): Promise<Skill> {
    // const found = await this.taskRepository.findOneBy({ id });
    const found = await this.skillRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Skill with ID '${id}' not found`);
    }

    return found;
  }
}
