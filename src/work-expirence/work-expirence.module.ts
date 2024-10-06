import { Module } from '@nestjs/common';
import { WorkExpirenceService } from './work-expirence.service';
import { WorkExpirenceController } from './work-expirence.controller';
import { WorkExperianceRepository } from './work-experiance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadsModule } from 'src/file-uploads/file-uploads.module';
import { Experience } from './entity/experianc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience]), FileUploadsModule],
  providers: [WorkExpirenceService, WorkExperianceRepository],
  controllers: [WorkExpirenceController],
})
export class WorkExpirenceModule {}
