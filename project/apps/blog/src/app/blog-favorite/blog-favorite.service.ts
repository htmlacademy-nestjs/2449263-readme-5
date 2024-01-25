import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogPostService } from '../blog-post/blog-post.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { BlogFavoriteEntity } from './blog-favorite.entity';
import { BlogFavoriteRepository } from './blog-favorite.repository';

@Injectable()
export class BlogFavoriteService {
  constructor(
    private readonly blogFavoriteRepository: BlogFavoriteRepository,
    private readonly blogPostService: BlogPostService,
  ) {}

  public async getFavoritesByPost(postId: string): Promise<BlogFavoriteEntity[]> {
    return this.blogFavoriteRepository.findByPostId(postId);
  }

  public async createFavorite(postId: string, dto: CreateFavoriteDto): Promise<BlogFavoriteEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    const newFavorite = BlogFavoriteEntity.fromDto(dto, existsPost.id!);
    return this.blogFavoriteRepository.save(newFavorite);
  }

  public async removeFavorite(id: string): Promise<void> {
    try {
      await this.blogFavoriteRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`No such favourite found: ${id}`);
    }
  }
}
