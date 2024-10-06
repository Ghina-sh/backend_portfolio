import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseDocumentFilePipe } from 'src/file-uploads/pipes/file-parser.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getMainData(): Promise<User> {
    return await this.userService.getMainData();
  }

  @Get('/user-with-aboutme')
  async getMainWithAboutMe(): Promise<{}> {
    return await this.userService.getMainWithAboutMe();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(parseDocumentFilePipe) file: Express.Multer.File,
  ): Promise<User> {
    return this.userService.addUser(createUserDto, file);
  }
}
