import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsString()
  @IsNotEmpty()
  describtion: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageUrl: string;
}
