import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SkillType } from './skill-type.enum';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  name: String;

  @Column()
  imageUrl: String;

  @Column()
  type: SkillType;
}
