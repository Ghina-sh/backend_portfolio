import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entity/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialRepository {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  async findAll(): Promise<Testimonial[]> {
    const testimonials = await this.testimonialRepository.find();
    return testimonials;
  }

  async insert(
    createTestimonialDto: CreateTestimonialDto,
  ): Promise<Testimonial> {
    const { name, profession, imageUrl, describtion } = createTestimonialDto;

    const testimonial = this.testimonialRepository.create({
      name,
      profession,
      imageUrl,
      describtion,
    });

    await this.testimonialRepository.save(testimonial);

    return testimonial;
  }
}
