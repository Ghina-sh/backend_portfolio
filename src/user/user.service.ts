import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { AboutMeRepository } from 'src/about-me/about-me.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly aboutMeRepository: AboutMeRepository,
    private readonly cloudinary: FileUploadsService,
  ) {}

  getMainData(): Promise<User> {
    return this.userRepository.getUserMainData();
  }

  async getMainWithAboutMe(): Promise<{}> {
    const user = await this.userRepository.getUserMainData();
    const aboutMe = await this.aboutMeRepository.getAboutMe();

    return { user: user, 'about-me': aboutMe };
  }

  async addUser(
    createUserDto: CreateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    const fileUrl = await this.cloudinary.upload(file);
    createUserDto.cvFileUrl = fileUrl.url;

    return this.userRepository.insert(createUserDto);
  }
}
