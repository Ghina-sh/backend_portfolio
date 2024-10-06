import { Injectable } from '@nestjs/common';
import { AboutMeRepository } from './about-me.repository';
import { AboutMe } from './entity/about-me.entity';
import { CreateAboutMeDto } from './dto/create-about-me.dto';

@Injectable()
export class AboutMeService {
  constructor(private aboutMeRepository: AboutMeRepository) {}

  getAboutMe(): Promise<AboutMe> {
    return this.aboutMeRepository.getAboutMe();
  }

  addAboutMe(createAboutMeDto: CreateAboutMeDto): Promise<AboutMe> {
    return this.aboutMeRepository.insert(createAboutMeDto);
  }
}
