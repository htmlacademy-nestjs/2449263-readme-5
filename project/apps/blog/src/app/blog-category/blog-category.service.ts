import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { BlogCategoryRepository } from './blog-category.repository';
import { BlogCategoryEntity } from './blog-category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class BlogCategoryService {
  constructor(
    private readonly blogCategoryRepository: BlogCategoryRepository
  ) {}

  public async getCategory(id: string): Promise<BlogCategoryEntity | null> {
    return this.blogCategoryRepository.findById(id);
  }

  public async getAllCategories(): Promise<(BlogCategoryEntity)[]> {
    return await this.blogCategoryRepository.find();
  }

  public async createCategory(dto: CreateCategoryDto): Promise<BlogCategoryEntity> {
    const existsCategory = (await this.blogCategoryRepository.find({ title: dto.title })).at(0);
    if (existsCategory) {
      throw new ConflictException('Same category title already exists');
    }

    const newCategory = new BlogCategoryEntity(dto);
    await this.blogCategoryRepository.save(newCategory);

    return newCategory;
  }

  public async deleteCategory(id: string): Promise<void> {
    try {
      await this.blogCategoryRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  public async updateCategory(id: string, dto: UpdateCategoryDto): Promise<BlogCategoryEntity> {
    const blogCategoryEntity = new BlogCategoryEntity(dto);

    try {
      const updatedCategory = await this.blogCategoryRepository.update(id, blogCategoryEntity);
      return updatedCategory;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  public async getCategoriesByIds(categoryIds: string[]): Promise<BlogCategoryEntity[]> {
    const categories = await this.blogCategoryRepository.findByIds(categoryIds);

    if (categories.length !== categoryIds.length) {
      const foundCategoryIds = categories.map((category) => category.id);
      const notFoundCategoryIds = categoryIds.filter((categoryId) => !foundCategoryIds.includes(categoryId));

      if (notFoundCategoryIds.length > 0) {
        throw new NotFoundException(`Categories with ids ${notFoundCategoryIds.join(', ')} not found.`);
      }
    }

    return categories;
  }
}
