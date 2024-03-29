import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostEntity } from './blog-post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './query/blog-post.query';
import { PaginationResult } from '@project/libs/types';
import { BlogCategoryService } from '../blog-category/blog-category.service';


@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCategoryService: BlogCategoryService,
  ) {}

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const categories = await this.blogCategoryService.getCategoriesByIds(dto.categories);
    const newPost = BlogPostEntity.fromDto(dto, categories);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    let isSameCategories = true;
    let hasChanges = false;
  
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'categories' && existsPost[key as keyof BlogPostEntity] !== value) {
        existsPost[key as keyof BlogPostEntity] = value;
        hasChanges = true;
      }

      if (key === 'categories' && value) {
        const currentCategoryIds = existsPost.categories.map((category) => category.id);
        isSameCategories = currentCategoryIds.length === value.length &&
          currentCategoryIds.some((categoryId) => value.includes(categoryId));

        if (! isSameCategories) {
          existsPost.categories = await this.blogCategoryService.getCategoriesByIds(dto.categories!);
        }
      }
    }

    if (isSameCategories && ! hasChanges) {
      return existsPost;
    }

    return this.blogPostRepository.update(id, existsPost);
  }
}
