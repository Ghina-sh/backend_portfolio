import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutMe } from './entity/about-me.entity';
import { CreateAboutMeDto } from './dto/create-about-me.dto';

@Injectable()
export class AboutMeRepository {
  constructor(
    @InjectRepository(AboutMe)
    private readonly aboutMeRepository: Repository<AboutMe>,
  ) {}

  async getAboutMe(): Promise<AboutMe> {
    const id = '1';
    const aboutMe = await this.aboutMeRepository.findOne({
      where: { id: id },
    });

    if (!aboutMe) {
      throw new NotFoundException(`aboutMe with id '${id}' not found`);
    }

    return aboutMe;
  }

  async insert(createAboutMeDto: CreateAboutMeDto): Promise<AboutMe> {
    const { descrebtion, experiance, project } = createAboutMeDto;

    const user = this.aboutMeRepository.create({
      descrebtion,
      experiance,
      project,
    });

    await this.aboutMeRepository.save(user);
    return user;
  }
}
