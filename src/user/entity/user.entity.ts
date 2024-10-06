import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  profession: string;

  @Column()
  describtion: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  linkedinTilte: string;

  @Column()
  linkedinLink: string;

  @Column()
  cvFileUrl: string;
}
