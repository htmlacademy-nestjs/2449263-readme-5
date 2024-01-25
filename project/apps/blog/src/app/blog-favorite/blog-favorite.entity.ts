import { Favorite } from '@project/libs/types';
import { Entity } from '@project/libs/core';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

export class BlogFavoriteEntity implements Favorite, Entity<string, Favorite> {
  public id?: string;
  public postId: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;
  
  public populate(data: Favorite): BlogFavoriteEntity {
    this.id = data.id ?? undefined;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): Favorite {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  static fromObject(data: Favorite): BlogFavoriteEntity {
    return new BlogFavoriteEntity()
      .populate(data);
  }

  static fromDto(dto: CreateFavoriteDto, postId: string): BlogFavoriteEntity {
    return new BlogFavoriteEntity()
      .populate({
        ...dto,
        postId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  }
}
