import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutMeRepository as AboutMeRepository } from './about-me.repository';
import { AboutMe } from './entity/about-me.entity';
import { AboutMeService } from './about-me.service';
import { AboutMeController } from './about-me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutMe])],
  providers: [AboutMeService, AboutMeRepository],
  controllers: [AboutMeController],
  exports: [AboutMeRepository],
})
export class AboutMeModule {}
