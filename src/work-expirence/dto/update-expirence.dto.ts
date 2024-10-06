import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExperienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsArray()
  @IsNotEmpty()
  myWorks: string[];

  @IsString()
  @IsNotEmpty()
  logoUrl: string;
}
