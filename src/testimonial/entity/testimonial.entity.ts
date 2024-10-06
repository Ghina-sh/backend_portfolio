import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  profession: string;

  @Column()
  describtion: string;

  @Column()
  imageUrl: string;
}
