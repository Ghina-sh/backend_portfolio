import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserMainData(): Promise<User> {
    const name = 'Ghina Sharaf';
    const user = await this.userRepository.findOne({
      where: { name: name },
    });

    if (!user) {
      throw new NotFoundException(`Task with name '${name}' not found`);
    }

    return user;
  }

  async insert(createUserDto: CreateUserDto): Promise<User> {
    const {
      name,
      profession,
      describtion,
      email,
      address,
      phone,
      linkedinTilte,
      linkedinLink,
      cvFileUrl,
    } = createUserDto;

    const user = this.userRepository.create({
      name,
      profession,
      describtion,
      email,
      address,
      phone,
      linkedinTilte,
      linkedinLink,
      cvFileUrl,
    });

    await this.userRepository.save(user);
    return user;
  }
}
