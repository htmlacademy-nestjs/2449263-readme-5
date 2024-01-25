import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/libs/blog/models';
import { BlogFavoriteController } from './blog-favorite.controller';
import { BlogFavoriteService } from './blog-favorite.service';
import { BlogFavoriteRepository } from './blog-favorite.repository';
import { BlogPostModule } from '../blog-post/blog-post.module';

@Module({
  imports: [BlogPostModule, PrismaClientModule],
  controllers: [BlogFavoriteController],
  providers: [BlogFavoriteService, BlogFavoriteRepository],
})
export class BlogFavoriteModule {}