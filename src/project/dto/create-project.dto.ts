import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProjectType } from '../entity/project-type.enum';
import { ProjectPlatform } from '../entity/project-platform.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsNotEmpty()
  describtion: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ProjectType)
  type: ProjectType;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ProjectPlatform)
  platform: ProjectPlatform;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  mainImageUrl: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  des1ImageUrl: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  des2ImageUrl: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  des3ImageUrl: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logoUrl: string;

  // @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  myWorks: string[];

  @IsString()
  @IsOptional()
  demoLink: string;
}
