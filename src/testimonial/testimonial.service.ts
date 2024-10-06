import { Injectable } from '@nestjs/common';
import { TestimonialRepository } from './testimonial.repository';
import { Testimonial } from './entity/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';

@Injectable()
export class TestimonialService {
  constructor(
    private testimonialRepository: TestimonialRepository,
    private readonly cloudinary: FileUploadsService,
  ) {}

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await this.testimonialRepository.findAll();
  }

  async AddTestimonial(
    createTestimonialDto: CreateTestimonialDto,
    image: Express.Multer.File,
  ): Promise<Testimonial> {
    const imageUrl = await this.cloudinary.upload(image);
    
    createTestimonialDto.imageUrl = imageUrl.url;
    return await this.testimonialRepository.insert(createTestimonialDto);
  }
}
