import { Module } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialController } from './testimonial.controller';
import { TestimonialRepository } from './testimonial.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimonial } from './entity/testimonial.entity';
import { FileUploadsModule } from 'src/file-uploads/file-uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial]), FileUploadsModule],
  providers: [TestimonialService, TestimonialRepository],
  controllers: [TestimonialController],
})
export class TestimonialModule {}
