import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logoUrl: string;

  @IsArray()
  @IsNotEmpty()
  myWorks: string[];
}
