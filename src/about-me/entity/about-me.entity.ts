import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AboutMe {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  descrebtion: string;

  @Column()
  experiance: number;

  @Column()
  project: string;
}
