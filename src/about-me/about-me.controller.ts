import { Body, Controller, Get, Post } from '@nestjs/common';
import { AboutMeService } from './about-me.service';
import { AboutMe } from './entity/about-me.entity';
import { CreateAboutMeDto } from './dto/create-about-me.dto';

@Controller('about-me')
export class AboutMeController {
  constructor(private aboutMeService: AboutMeService) {}

  @Get()
  async getAboutMe(): Promise<AboutMe> {
    return await this.aboutMeService.getAboutMe();
  }

  @Post()
  async addAboutMe(
    @Body() createAboutMeDto: CreateAboutMeDto,
  ): Promise<AboutMe> {
    return await this.aboutMeService.addAboutMe(createAboutMeDto);
  }
}
