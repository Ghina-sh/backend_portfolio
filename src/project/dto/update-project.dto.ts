import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProjectType } from '../entity/project-type.enum';
import { ProjectPlatform } from '../entity/project-platform.enum';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  describtion: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ProjectType)
  type: ProjectType;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ProjectPlatform)
  platform: ProjectPlatform;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  mainImageUrl: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  des1ImageUrl: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  des2ImageUrl: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  des3ImageUrl: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  logoUrl: string;

  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  myWorks: string[];

  @IsString()
  @IsOptional()
  demoLink: string;
}
