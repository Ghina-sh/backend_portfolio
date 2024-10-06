import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SkillType } from '../entity/skill-type.enum';

export class UpdateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(SkillType)
  type: SkillType;
}
