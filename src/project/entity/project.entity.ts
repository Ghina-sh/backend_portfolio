import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectType } from './project-type.enum';
import { ProjectPlatform } from './project-platform.enum';
import { Expose } from 'class-transformer';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @Expose({ groups: ['send'] })
  id: string;

  @Column()
  @Expose({ groups: ['send'] })
  name: string;

  @Column()
  @Expose({ groups: ['send'] })
  company: string;

  @Column()
  @Expose({ groups: ['send'] })
  type: ProjectType;

  @Column()
  @Expose({ groups: ['send'] })
  platform: ProjectPlatform;

  @Column()
  @Expose({ groups: ['send'] })
  mainImageUrl: string;

  // Not exposed
  @Expose({ groups: ['not-send'] })
  @Column()
  date: string;

  @Expose({ groups: ['not-send'] })
  @Column()
  describtion: string;

  @Column()
  @Expose({ groups: ['not-send'] })
  des1ImageUrl: string;

  @Column()
  @Expose({ groups: ['not-send'] })
  des2ImageUrl: string;

  @Column()
  @Expose({ groups: ['not-send'] })
  des3ImageUrl: string;

  @Column()
  @Expose({ groups: ['not-send'] })
  logoUrl: string;

  @Column('text', { array: true })
  @Expose({ groups: ['not-send'] })
  myWorks: string[];

  @Column()
  @Expose({ groups: ['not-send'] })
  demoLink: string;
}
