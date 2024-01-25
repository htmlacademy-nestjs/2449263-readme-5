import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Post } from '@project/libs/types';
import { PrismaClientService } from '@project/libs/blog/models';
import { BasePostgresRepository } from '@project/libs/core';
import { BlogPostEntity } from './blog-post.entity';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogPostEntity.fromObject);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        categories: {
          connect: pojoEntity.categories
            .map(({ id }) => ({ id }))
        },
        comments: {
          connect: []
        }
      }
    });

    entity.id = record.id;
    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        categories: true,
        comments: true,
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document)!;
  }

  public async update(id: string, entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedPost = await this.client.post.update({
      where: { id },
      data: {
        title: pojoEntity.title,
        content: pojoEntity.content,
        description: pojoEntity.description,
        categories: {
          set: pojoEntity.categories.map((category) => ({ id: category.id })),
        }
      },
      include: {
        categories: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(updatedPost)!;
  }

  public async find(): Promise<BlogPostEntity[]> {
    const documents = await this.client.post.findMany({ 
        include: {
          categories: true,
          comments: true,
        },
      });

    return documents.map((document) => this.createEntityFromDocument(document)!);
  }
}
