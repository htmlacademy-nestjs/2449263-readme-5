import { Comment } from '@project/libs/types';
import { Entity } from '@project/libs/core';
import { CreateCommentDto } from './dto/create-comment.dto';

export class BlogCommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public message: string;
  public postId?: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;
  
  public populate(data: Comment): BlogCommentEntity {
    this.id = data.id ?? undefined;
    this.message = data.message;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      message: this.message,
      userId: this.userId
    }
  }

  static fromObject(data: Comment): BlogCommentEntity {
    return new BlogCommentEntity()
      .populate(data);
  }

  static fromDto(dto: CreateCommentDto, postId: string): BlogCommentEntity {
    return new BlogCommentEntity()
      .populate({
        ...dto,
        postId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  }
}
