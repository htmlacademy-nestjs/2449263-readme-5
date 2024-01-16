import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserService } from './blog-user.service';
import { BlogUserController } from './blog-user.controller';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  controllers: [BlogUserController],
  providers: [BlogUserService, BlogUserRepository],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
