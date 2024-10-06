import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './entity/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseImageFilePipe } from 'src/file-uploads/pipes/file-parser.pipe';

@Controller('testimonial')
export class TestimonialController {
  constructor(private testimonialService: TestimonialService) {}

  @Get('all')
  async getAllTestimonials(): Promise<Testimonial[]> {
    return this.testimonialService.getAllTestimonials();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async AddTestimonial(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @UploadedFile(parseImageFilePipe)
    image: Express.Multer.File,
  ): Promise<Testimonial> {
    return this.testimonialService.AddTestimonial(createTestimonialDto, image);
  }
}
