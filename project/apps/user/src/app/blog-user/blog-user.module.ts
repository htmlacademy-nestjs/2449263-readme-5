import { Module } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { BlogUserController } from './blog-user.controller';
import { BlogUserRepository } from './blog-user.repository';

@Module({
  controllers: [BlogUserController],
  providers: [BlogUserService, BlogUserRepository],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
