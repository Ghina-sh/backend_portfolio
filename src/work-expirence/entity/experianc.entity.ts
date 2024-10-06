import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column('text', { array: true })
  myWorks: string[];

  @Column()
  logoUrl: string;
}
