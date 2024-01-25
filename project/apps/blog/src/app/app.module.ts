import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { BlogFavoriteModule } from './blog-favorite/blog-favorite.module';

@Module({
  imports: [BlogCategoryModule, BlogPostModule, BlogCommentModule, BlogFavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


