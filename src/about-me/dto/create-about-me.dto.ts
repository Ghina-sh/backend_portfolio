import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAboutMeDto {
  @IsString()
  @IsNotEmpty()
  descrebtion: string;

  @IsString()
  @IsOptional()
  experiance: number;

  @IsString()
  @IsNotEmpty()
  project: string;
}
