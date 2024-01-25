import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/libs/core';
import { BlogFavoriteEntity } from './blog-favorite.entity';
import { Favorite } from '@project/libs/types';
import { PrismaClientService } from '@project/libs/blog/models';

@Injectable()
export class BlogFavoriteRepository extends BasePostgresRepository<BlogFavoriteEntity, Favorite> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogFavoriteEntity.fromObject);
  }

  public async save(entity: BlogFavoriteEntity): Promise<BlogFavoriteEntity> {
    const record = await this.client.favorite.create({
      data: {
        userId: entity.userId,
        post: { connect: {id: entity.postId}},
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<BlogFavoriteEntity> {
    const record = await this.client.favorite.findFirst();

    if (! record) {
      throw new NotFoundException(`No such entry in favourites: ${id}`);
    }

    return this.createEntityFromDocument(record)!;
  }

  public async findByPostId(postId: string): Promise<BlogFavoriteEntity[]> {
    const records = await this.client.favorite.findMany({
      where: {
        postId
      }
    });

    return records.map(record => this.createEntityFromDocument(record)!);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.favorite.delete({
      where: {
        id
      }
    });
  }
}
