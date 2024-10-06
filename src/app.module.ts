import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { WorkExpirenceModule } from './work-expirence/work-expirence.module';
import { SkillModule } from './skill/skill.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AboutMeModule } from './about-me/about-me.module';
import { FileUploadsModule } from './file-uploads/file-uploads.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UserModule,
    AboutMeModule,
    ProjectModule,
    WorkExpirenceModule,
    SkillModule,
    TestimonialModule,
    MulterModule.register({
      dest: './uploads',  // Define a temporary upload destination
    }),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    FileUploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
