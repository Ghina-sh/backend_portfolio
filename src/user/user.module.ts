import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AboutMeModule } from 'src/about-me/about-me.module';
import { AboutMeRepository } from 'src/about-me/about-me.repository';
import { FileUploadsModule } from 'src/file-uploads/file-uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AboutMeModule, FileUploadsModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
